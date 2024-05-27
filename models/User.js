module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        firstName : {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        lastName : {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        gender : {
            type: DataTypes.STRING(7),
            allowNull: false,
            validate: {
                isIn: [['Male', 'Female']]
            }
        },
        role : {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                isIn: [['admin', 'regular']]
            }
        },
    },{
        tableName: "users"
    })

    User.associate = model => {
        User.hasOne(model.LoginDetail, {
            foreignKey: {
                name: "userId"
            }
        })
        User.hasMany(model.Facility, {
            foreignKey: {
                name: "userId"
            }
        })
    }

    return User;
}