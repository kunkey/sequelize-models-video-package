const { Model, DataTypes } = Sequelize;
const CmsRoleListModel = require("../role/role_list.model");
const CmsRolePermissionModel = require("../role/role_permission.model");

class CmsUserModel extends Model {
  /*** TABLE NAME ***/
  static TABLE_NAME = "Cms_User";

  static ACCOUNT_TYPE_ENUM = {
    ROOT: "root",
    CUSTOM: "custom"
  };

  static STATUS_ENUM = {
    ACTIVE: "active",
    PENDING: "pending",
    BLOCKED: "blocked",
  };

  static scopes = {
    withRole() {
      return {
        include: [
          {
            model: CmsRoleListModel,
            as: "cms_role",
            attributes: [
              "id",
              "role_name",
              "role_permisstions_id",
              "is_default",
            ],
            include: [
              {
                model: CmsRolePermissionModel,
                as: "role_permission",
                attributes: ["id", "permission_name", "permissions_allow"],
              },
            ],
          },
        ],
      };
    },
    // withAgencyInfo() {
    //     return {
    //         include: [
    //             {
    //                 model: AgencyModel,
    //                 as: "AgencyInfo"
    //             }
    //         ]
    //     }
    // },
    // withRoleAgency() {
    //     return {
    //         where: { role: UserModel.ROLE_ENUM.AGENCY }
    //     }
    // },
    // withRoleUser() {
    //     return {
    //         where: { role: UserModel.ROLE_ENUM.USER }
    //     }
    // },
    // withBankUser() {
    //     return {
    //         include: [
    //             {
    //                 model: BankUserModel,
    //                 as: "BankUser",
    //                 //attributes: { exclude: ["password", "deletedAt", "code", "role", "updatedAt"] },
    //             },
    //         ]
    //     }
    // },
    // byAgencyCode(code) {
    //     return {
    //         include: [
    //             {
    //                 model: AgencyModel,
    //                 as: "AgencyInfo",
    //                 where: { code }
    //             }
    //         ]
    //     }
    // },
  };

  static Entity = {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    account_type: {
      type: DataTypes.ENUM({
        values: Object.values(CmsUserModel.ACCOUNT_TYPE_ENUM),
      }),
      defaultValue: CmsUserModel.ACCOUNT_TYPE_ENUM.SUPER_ADMIN,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(19, 2),
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM({
        values: Object.values(CmsUserModel.STATUS_ENUM),
      }),
      defaultValue: CmsUserModel.STATUS_ENUM.ACTIVE,
    },
    security_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  };

  static initModel = (sequelize) => {
    return CmsUserModel.init(CmsUserModel.Entity, {
      paranoid: true,
      indexes: [
        {
          unique: true,
          fields: ["username"],
        },
        {
          unique: true,
          fields: ["email"],
        },
        {
          unique: true,
          fields: ["phone"],
        },
      ],
      tableName: CmsUserModel.TABLE_NAME,
      updatedAt: "updatedAt",
      createdAt: "createdAt",
      deletedAt: "deletedAt",
      scopes: CmsUserModel.scopes,
      sequelize,
    });
  }

  static findByUsername = async (username) => {
    const user = await CmsUserModel.findOne({
      where: { username },
    });
    if (user == null) {
      return null;
    } else {
      return user;
    }
  };

  static findByEmail = async (email) => {
    const user = await CmsUserModel.findOne({
      where: { email },
    });
    if (user == null) {
      return null;
    } else {
      return user;
    }
  };

  static findByID = async (userId) => {
    const user = await CmsUserModel.findOne({
      where: {
        id: userId,
        // status: CmsUserModel.STATUS_ENUM.ACTIVE
      },
    });
    if (user == null) {
      return null;
    } else {
      return user;
    }
  };

  static findByPhoneNumber = async (PhoneNumber) => {
    const user = await CmsUserModel.findOne({
      where: { phone: PhoneNumber },
    });
    if (user == null) {
      return null;
    } else {
      return user;
    }
  };
}

module.exports = CmsUserModel;
