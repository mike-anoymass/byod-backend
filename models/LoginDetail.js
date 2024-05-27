module.exports = (sequelize, DataTypes) => {
    const LoginDetail = sequelize.define("LoginDetail", {
        email : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, ]
            }
        },
    },{
        tableName: "login_details"
    })

    LoginDetail.associate = model => {
        LoginDetail.belongsTo(model.User, {
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            foreignKey: {
                name: "userId",
                allowNull: false
            }
        })
    }

    return LoginDetail;
}