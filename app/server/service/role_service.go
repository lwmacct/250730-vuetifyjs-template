package service

import (
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/database"
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/model"
)

// RoleService 角色服务
type RoleService struct{}

// CreateRole 创建角色
func (s *RoleService) CreateRole(role *model.Role) error {
	return database.DB.Create(role).Error
}

// GetRoleByID 根据ID获取角色
func (s *RoleService) GetRoleByID(id uint) (*model.Role, error) {
	var role model.Role
	err := database.DB.Preload("Permissions").First(&role, id).Error
	if err != nil {
		return nil, err
	}
	return &role, nil
}

// GetRoleByName 根据名称获取角色
func (s *RoleService) GetRoleByName(name string) (*model.Role, error) {
	var role model.Role
	err := database.DB.Preload("Permissions").Where("name = ?", name).First(&role).Error
	if err != nil {
		return nil, err
	}
	return &role, nil
}

// GetAllRoles 获取所有角色（分页）
func (s *RoleService) GetAllRoles(page, pageSize int) ([]model.Role, int64, error) {
	var roles []model.Role
	var total int64

	offset := (page - 1) * pageSize

	err := database.DB.Model(&model.Role{}).Count(&total).Error
	if err != nil {
		return nil, 0, err
	}

	err = database.DB.Preload("Permissions").Offset(offset).Limit(pageSize).Find(&roles).Error
	if err != nil {
		return nil, 0, err
	}

	return roles, total, nil
}

// UpdateRole 更新角色
func (s *RoleService) UpdateRole(role *model.Role) error {
	return database.DB.Save(role).Error
}

// DeleteRole 删除角色（软删除）
func (s *RoleService) DeleteRole(id uint) error {
	return database.DB.Delete(&model.Role{}, id).Error
}

// AssignPermissionToRole 为角色分配权限
func (s *RoleService) AssignPermissionToRole(roleID, permissionID uint) error {
	var role model.Role
	var permission model.Permission

	if err := database.DB.First(&role, roleID).Error; err != nil {
		return err
	}

	if err := database.DB.First(&permission, permissionID).Error; err != nil {
		return err
	}

	return database.DB.Model(&role).Association("Permissions").Append(&permission)
}

// RemovePermissionFromRole 移除角色权限
func (s *RoleService) RemovePermissionFromRole(roleID, permissionID uint) error {
	var role model.Role
	var permission model.Permission

	if err := database.DB.First(&role, roleID).Error; err != nil {
		return err
	}

	if err := database.DB.First(&permission, permissionID).Error; err != nil {
		return err
	}

	return database.DB.Model(&role).Association("Permissions").Delete(&permission)
}

// GetRolePermissions 获取角色的所有权限
func (s *RoleService) GetRolePermissions(roleID uint) ([]model.Permission, error) {
	var role model.Role
	if err := database.DB.Preload("Permissions").First(&role, roleID).Error; err != nil {
		return nil, err
	}
	return role.Permissions, nil
}

