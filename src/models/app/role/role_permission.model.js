const { Model, DataTypes } = Sequelize;

class AppRolePermissionModel extends Model {

    /*** TABLE NAME ***/
    static TABLE_NAME = "App_Role_Permission";

    static scopes = {};

    static Entity = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        permission_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permissions_allow: {
            type: DataTypes.TEXT,
            get: function () {
                return JSON.parse(this.getDataValue("permissions_allow"));
            },
            set: function (value) {
                return this.setDataValue("permissions_allow", JSON.stringify(value));
            },
            defaultValue: {},
            allowNull: false
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
        return AppRolePermissionModel.init(AppRolePermissionModel.Entity, {
            paranoid: true,
            // indexes: [{
            //     unique: true, 
            //     fields: [
            //         "role_name"
            //     ]
            // }],
            tableName: AppRolePermissionModel.TABLE_NAME,
            updatedAt: "updatedAt",
            createdAt: "createdAt",
            deletedAt: "deletedAt",
            scopes: AppRolePermissionModel.scopes,
            sequelize
        });
    }

    static associate = (models) => {
        
    }
}

module.exports = AppRolePermissionModel;
