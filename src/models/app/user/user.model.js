const { Model, DataTypes } = Sequelize;

class AppUserModel extends Model {
  /*** TABLE NAME ***/
  static TABLE_NAME = "App_User";

  static STATUS_ENUM = {
    ACTIVE: "active",
    PENDING: "pending",
    BLOCKED: "blocked",
  };
  static ACCOUNT_TYPE_ENUM = {
    CUSTOMER: "customer",
    AGENCY: "agency",
  };
  static VERIFY_ENUM = {
    TRUE: true,
    FALSE: false,
  };

  // static scopes = {
  //   withRole() {
  //     return {
  //       include: [
  //         {
  //           model: AppRoleListModel,
  //           as: "user_role",
  //           attributes: [
  //             "id",
  //             "role_name",
  //             "role_permisstions_id",
  //             "is_default",
  //           ],
  //           include: [
  //             {
  //               model: AppRolePermissionModel,
  //               as: "role_permission",
  //               attributes: ["id", "permission_name", "permissions_allow"],
  //             },
  //           ],
  //         },
  //       ],
  //     };
  //   },
  // };

  static Entity = {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    account_type: {
      type: DataTypes.ENUM({
        values: Object.values(AppUserModel.ACCOUNT_TYPE_ENUM),
      }),
      defaultValue: AppUserModel.ACCOUNT_TYPE_ENUM.CUSTOMER,
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
        values: Object.values(AppUserModel.STATUS_ENUM),
      }),
      defaultValue: AppUserModel.STATUS_ENUM.ACTIVE,
    },
    verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: AppUserModel.VERIFY_ENUM.FALSE,
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
    return AppUserModel.init(AppUserModel.Entity, {
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
      tableName: AppUserModel.TABLE_NAME,
      updatedAt: "updatedAt",
      createdAt: "createdAt",
      deletedAt: "deletedAt",
      scopes: AppUserModel.scopes,
      sequelize,
    });
  }

  static associate = (models) => {
    // console.log(models);
    // models.AppUserModel.belongsTo(models.AppRoleListModel, {
    //   as: "user_role",
    //   foreignKey: "role"
    // });
  }

  static findByUsername = async (username) => {
    const user = await AppUserModel.findOne({ where: { username } });
    return !!user ? user : null;
  };

  static findByEmail = async (email) => {
    const user = await AppUserModel.findOne({ where: { email } });
    return !!user ? user : null;
  };

  static findByID = async (userId) => {
    const user = await AppUserModel.findOne({ where: { id: userId } });
    return !!user ? user : null;
  };

  static findByPhoneNumber = async (PhoneNumber) => {
    const user = await AppUserModel.findOne({ where: { phone: PhoneNumber } });
    return !!user ? user : null;
  };
}

module.exports = AppUserModel;
