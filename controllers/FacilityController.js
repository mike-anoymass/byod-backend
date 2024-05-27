const { Facility, District, Owner } = require("../models");

const create_facility = async (req, res) => {
  try {
    const { id } = req.authUser.user;
    const formData = req.body;

    //add authenticated user id to form data
    formData.id = id;

    const facility = await Facility.create(formData);

    return res.json({
      message: "Facility created successfully",
      data: facility,
    });
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

const get_all_facilities = async (req, res) => {
  try {
    const facilities = await Facility.findAll({include: [District, Owner]});

    return res.json(facilities);
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
  get_all_facilities,
  create_facility,
};
