module.exports = (sequelize, DataTypes) => {
    const Facility = sequelize.define("Facility", {
        facility_code : {
            type: DataTypes.STRING(9),
            allowNull: false,
            primaryKey: true
        },
        facility_name : {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
    },{
        tableName: "facilities"
    })

    Facility.associate = model => {
        Facility.belongsTo(model.User, {
            onUpdate: "CASCADE",
            ondeDelete: "CASCADE",
            foreignKey: {
                name: "userId",
                allowNull: false
            }
        })
        Facility.belongsTo(model.District, {
            onUpdate: "CASCADE",
            ondeDelete: "CASCADE",
            foreignKey: {
                name: "district_id",
                allowNull: false
            }
        })
        Facility.belongsTo(model.Owner, {
            onUpdate: "CASCADE",
            ondeDelete: "CASCADE",
            foreignKey: {
                name: "owner_id",
                allowNull: false
            }
        })
    }

    return Facility;
}