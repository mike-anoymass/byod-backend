const { User, LoginDetail, sequelize } = require("../models");
const generatePasswordHash = require("../utils/generatePasswordHash");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await LoginDetail.findOne({
      where: {
        email,
      },
      include: [User]
    });

    if (user) {
        const isPasswdMatch = bcrypt.compareSync(password, user.password)

        if(isPasswdMatch){
            const secretKey = 'loginToken'
            const data = {
                user: {
                    id: user.userId,
                    firstName: user.User.firstName,
                    lastName: user.User.lastName,
                    gender: user.User.gender,
                    email: user.email,
                    role: user.User.role,
                },
                loginStatus: true,
            }
            const options = {expiresIn: '2hr'}

            const token = sign(data, secretKey, options)

            res.json(token)
        }else{
            res.status(400).json({message: 'Password does not match - Bad request'}) 
        }
    }else{
        res.status(400).json({message: 'User not found - Bad request'})
    }
  } catch (error) {
    if (error.errors) {
      const errorMsg = error.errors.map((msg) => {
        const errMsg = {
          message: msg.message,
          value: msg.value,
        };

        return errMsg;
      });

      return res.status(500).json({ error: errorMsg[0] });
    } else {
      return res.status(500).json({ error: { message: error.message } });
    }
  }
};

const getAuthUser = async (req, res) => {
  try {
    const authUser = req.authUser

    return res.json(authUser);
  } catch (error) {
    if (error.errors) {
      const errorMsg = error.errors.map((msg) => {
        const errMsg = {
          message: msg.message,
          value: msg.value,
        };

        return errMsg;
      });

      return res.status(500).json({ error: errorMsg[0] });
    } else {
      return res.status(500).json({ error: { message: error.message } });
    }
  }
};

module.exports = {
  login,
  getAuthUser,
};
