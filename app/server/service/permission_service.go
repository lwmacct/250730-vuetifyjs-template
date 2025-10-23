package service

import (
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/database"
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/model"
)

// PermissionService 权限服务
type PermissionService struct{}

// CreatePermission 创建权限
func (s *PermissionService) CreatePermission(permission *model.Permission) error {
	return database.DB.Create(permission).Error
}

// GetPermissionByID 根据ID获取权限
func (s *PermissionService) GetPermissionByID(id uint) (*model.Permission, error) {
	var permission model.Permission
	err := database.DB.First(&permission, id).Error
	if err != nil {
		return nil, err
	}
	return &permission, nil
}

// GetPermissionByName 根据名称获取权限
func (s *PermissionService) GetPermissionByName(name string) (*model.Permission, error) {
	var permission model.Permission
	err := database.DB.Where("name = ?", name).First(&permission).Error
	if err != nil {
		return nil, err
	}
	return &permission, nil
}

// GetAllPermissions 获取所有权限（分页）
func (s *PermissionService) GetAllPermissions(page, pageSize int) ([]model.Permission, int64, error) {
	var permissions []model.Permission
	var total int64

	offset := (page - 1) * pageSize

	err := database.DB.Model(&model.Permission{}).Count(&total).Error
	if err != nil {
		return nil, 0, err
	}

	err = database.DB.Offset(offset).Limit(pageSize).Find(&permissions).Error
	if err != nil {
		return nil, 0, err
	}

	return permissions, total, nil
}

// UpdatePermission 更新权限
func (s *PermissionService) UpdatePermission(permission *model.Permission) error {
	return database.DB.Save(permission).Error
}

// DeletePermission 删除权限（软删除）
func (s *PermissionService) DeletePermission(id uint) error {
	return database.DB.Delete(&model.Permission{}, id).Error
}

