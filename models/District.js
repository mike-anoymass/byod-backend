module.exports = (sequelize, DataTypes) => {
    const District = sequelize.define("District", {
        district_name : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        district_code : {
            type: DataTypes.STRING(3),
            allowNull: false,
        },
        zone_id : {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },{
        tableName: "districts"
    })

    District.associate = model => {
        District.hasMany(model.Facility, {
            foreignKey: {
                name: "district_id",
                allowNull: false,
            }
        })
    }

    return District;
}