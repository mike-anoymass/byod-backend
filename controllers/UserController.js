const { User, LoginDetail, sequelize } = require("../models");
const generatePasswordHash = require("../utils/generatePasswordHash");

const register = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { firstName, lastName, gender, role, email, password } = req.body;
    const newUser = await User.create(
      {
        firstName,
        lastName,
        role,
        gender,
      },
      { transaction }
    );

    const loginDetails = await LoginDetail.create(
      {
        userId: newUser.id,
        email,
        password: generatePasswordHash(password),
      },
      { transaction }
    );

    await transaction.commit();

    return res.json({
      message: "User created successfully",
      userDetails: newUser,
      loginDetails,
    });
  } catch (error) {
    await transaction.rollback();

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

const getAll = async (req, res) => {
  try {
    const users = await User.findAll({ include: [LoginDetail] });

    return res.json(users);
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

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, { include: [LoginDetail] });

    return res.json(user);
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

const del = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await User.destroy({
      where: {
        id,
      },
    });

    return res.json(status);
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

const update = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { firstName, lastName, gender, role, email, password } = req.body;
    const user = await User.update(
      {
        firstName,
        lastName,
        role,
        gender,
      },
      {
        where: {
          id,
        },
      },
      { transaction }
    );

    const loginDetails = await LoginDetail.update(
      {
        email,
        password: generatePasswordHash(password),
      },
      {
        where: {
          userId: id,
        },
      },
      { transaction }
    );

    await transaction.commit();

    return res.json({
      status: {
        userDetails: user[0],
        loginDetails: loginDetails[0],
      },
    });
  } catch (error) {
    await transaction.rollback();

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
    register, 
    getAll,
    getOne,
    update,
    del,
};
