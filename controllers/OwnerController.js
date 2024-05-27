const { Owner } = require("../models");

const bulk_upload = async (req, res) => {
    const owners = req.body.owners;

    if (!owners || !Array.isArray(owners)) {
        return res.status(400).json({ error: 'Invalid input: owners should be an array.' });
    }

    try {
        const result = await Owner.bulkCreate(owners);
        res.json({ message: 'owners uploaded successfully', result });
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

const get_all_owners = async (req, res) => {
  try {
    const owners = await Owner.findAll();

    return res.json(owners);
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
  get_all_owners,
  bulk_upload,
};
