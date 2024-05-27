const { District } = require("../models");

const bulk_upload = async (req, res) => {
    const districts = req.body.districts;

    if (!districts || !Array.isArray(districts)) {
        return res.status(400).json({ error: 'Invalid input: districts should be an array.' });
    }

    try {
        const result = await District.bulkCreate(districts);
        res.json({ message: 'Districts uploaded successfully', result });
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

const get_all_districts = async (req, res) => {
  try {
    const districts = await District.findAll();

    return res.json(districts);
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
  get_all_districts,
  bulk_upload,
};
