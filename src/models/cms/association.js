module.exports = (models) => {
    const { CmsUserModel, CmsRoleListModel, CmsRolePermissionModel } = models;

    CmsUserModel.belongsTo(CmsRoleListModel, {
        as: "cms_role",
        foreignKey: "role"
    });
    
    CmsRoleListModel.hasMany(CmsUserModel, {
        as: "cms_user_role",
        foreignKey: "role"
    });
    
    CmsRoleListModel.belongsTo(CmsRolePermissionModel, {
        as: "role_permission",          
        foreignKey: "id"
    });
    
    CmsRolePermissionModel.hasMany(CmsRoleListModel, {
        as: "role_info",
        foreignKey: "role_permisstions_id"
    });
  
};