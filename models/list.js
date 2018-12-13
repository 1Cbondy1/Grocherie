module.exports = function (sequelize, dataTypes) {

    const List = sequelize.define("List", {
        title: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        category: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["Private", "Shared"]]
            }
        },
        createdAt: {
            type: dataTypes.DATETIME,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: dataType.DATETIME,
            defaultValues: Sequelize.NOW
        }
    });

    List.associate = function(models) {
        List.belongsTo(models.User, {onDelete: "cascade", as: "creator", foreignKey: "creatorId"});
        List.belongsToMany(models.User, {through: "listViewers", as: "viewable", foreignKey: "viewableId"});
        List.belongsToMany(models.User, {through: "listUsers", as: "usable", foreignKey: "usableId"});
        List.hasMany(models.Task, {as: "list", foreignKey: "listId"});
    }

    return List;
}

