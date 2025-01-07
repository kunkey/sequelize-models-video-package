const { Model, DataTypes } = Sequelize;

const CmsRolePermissionModel = require("./role_permission.model");

class CmsRoleListModel extends Model {

    /*** TABLE NAME ***/
    static TABLE_NAME = "Cms_Role_List";

    static scopes = {
        withPermissionAllow() {
            return {
                include: [
                    {
                        model: CmsRolePermissionModel,
                        as: "role_permission",
                        attributes: [
                            "id",
                            "permission_name",
                            "permissions_allow",
                            "createdAt",
                            "updatedAt",
                        ]
                    },
                ],
            };
        },
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
        return CmsRoleListModel.init(CmsRoleListModel.Entity, {
            paranoid: true,
            indexes: [{
                unique: true,
                fields: [
                    "role_name"
                ]
            }],
            tableName: CmsRoleListModel.TABLE_NAME,
            updatedAt: "updatedAt",
            createdAt: "createdAt",
            deletedAt: "deletedAt",
            scopes: CmsRoleListModel.scopes,
            sequelize
        });
    }
}

module.exports = CmsRoleListModel;
