const bcrypt = require('bcryptjs');

module.exports = passwd => {
    try {
        const saltRounds = 10
        const hash = bcrypt.hashSync(passwd, saltRounds)
        return hash;
    } catch (error) {
        console.log(error)
    }
}