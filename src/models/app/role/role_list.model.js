const { Model, DataTypes } = Sequelize;
// const AppRolePermissionModel = require("./role_permission.model");

class AppRoleListModel extends Model {

    /*** TABLE NAME ***/
    static TABLE_NAME = "App_Role_List";

    static scopes = {
        // withPermissionAllow() {
        //     return {
        //         include: [
        //             {
        //                 model: AppRolePermissionModel,
        //                 as: "role_permission",
        //                 attributes: [
        //                     "id",
        //                     "permission_name",
        //                     "permissions_allow",
        //                     "createdAt",
        //                     "updatedAt",
        //                 ]
        //             },
        //         ],
        //     };
        // },
    };

    static Entity = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role_permisstions_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        is_default: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        deletedAt: {
            type: DataTypes.DATE
        }
    };

    static initModel = (sequelize) => {
        return AppRoleListModel.init(AppRoleListModel.Entity, {
            paranoid: true,
            indexes: [{
                unique: true,
                fields: [
                    "role_name"
                ]
            }],
            tableName: AppRoleListModel.TABLE_NAME,
            updatedAt: "updatedAt",
            createdAt: "createdAt",
            deletedAt: "deletedAt",
            scopes: AppRoleListModel.scopes,
            sequelize
        });
    }
    
    static associate = (models) => {

    }
};

module.exports = AppRoleListModel;