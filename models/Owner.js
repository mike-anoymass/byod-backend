module.exports = (sequelize, DataTypes) => {
    const Owner = sequelize.define("Owner", {
        facility_owner : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description : {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        tableName: "owners"
    })

    Owner.associate = model => {
        Owner.hasMany(model.Facility, {
            foreignKey: {
                name: "owner_id",
                allowNull: false
            }
        })
    }

    return Owner;
}