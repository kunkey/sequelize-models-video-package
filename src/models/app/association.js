
// console.log(AppRolePermissionModel.prototype instanceof require('sequelize').Model); // true nếu đúng

module.exports = (models) => {
    const { AppUserModel, AppRoleListModel, AppRolePermissionModel } = models;

    AppUserModel.belongsTo(AppRoleListModel, {
        as: "user_role",
        foreignKey: "role"
    });
    
    AppRoleListModel.belongsTo(AppRolePermissionModel, {
        as: "role_permission",
        foreignKey: "role_permisstions_id"
    });
    
    AppRolePermissionModel.hasMany(AppRoleListModel, {
        as: "role_info",
        foreignKey: "role_permisstions_id"
    });
  
};