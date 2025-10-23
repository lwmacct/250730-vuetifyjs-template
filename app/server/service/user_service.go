package service

import (
	"errors"

	"github.com/lwmacct/250730-vuetifyjs-template/app/server/database"
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/model"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// UserService 用户服务
type UserService struct{}

// CreateUser 创建用户
func (s *UserService) CreateUser(user *model.User) error {
	// 密码加密
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)

	return database.DB.Create(user).Error
}

// GetUserByID 根据ID获取用户
func (s *UserService) GetUserByID(id uint) (*model.User, error) {
	var user model.User
	err := database.DB.Preload("Roles").First(&user, id).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

// GetUserByUsername 根据用户名获取用户
func (s *UserService) GetUserByUsername(username string) (*model.User, error) {
	var user model.User
	err := database.DB.Preload("Roles").Where("username = ?", username).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

// GetUserByEmail 根据邮箱获取用户
func (s *UserService) GetUserByEmail(email string) (*model.User, error) {
	var user model.User
	err := database.DB.Preload("Roles").Where("email = ?", email).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

// GetAllUsers 获取所有用户（分页）
func (s *UserService) GetAllUsers(page, pageSize int) ([]model.User, int64, error) {
	var users []model.User
	var total int64

	offset := (page - 1) * pageSize

	err := database.DB.Model(&model.User{}).Count(&total).Error
	if err != nil {
		return nil, 0, err
	}

	err = database.DB.Preload("Roles").Offset(offset).Limit(pageSize).Find(&users).Error
	if err != nil {
		return nil, 0, err
	}

	return users, total, nil
}

// UpdateUser 更新用户
func (s *UserService) UpdateUser(user *model.User) error {
	return database.DB.Save(user).Error
}

// DeleteUser 删除用户（软删除）
func (s *UserService) DeleteUser(id uint) error {
	return database.DB.Delete(&model.User{}, id).Error
}

// VerifyPassword 验证密码
func (s *UserService) VerifyPassword(user *model.User, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
}

// ChangePassword 修改密码
func (s *UserService) ChangePassword(id uint, oldPassword, newPassword string) error {
	user, err := s.GetUserByID(id)
	if err != nil {
		return err
	}

	// 验证旧密码
	if err := s.VerifyPassword(user, oldPassword); err != nil {
		return errors.New("旧密码错误")
	}

	// 加密新密码
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	user.Password = string(hashedPassword)
	return database.DB.Save(user).Error
}

// AssignRoleToUser 为用户分配角色
func (s *UserService) AssignRoleToUser(userID, roleID uint) error {
	var user model.User
	var role model.Role

	if err := database.DB.First(&user, userID).Error; err != nil {
		return err
	}

	if err := database.DB.First(&role, roleID).Error; err != nil {
		return err
	}

	return database.DB.Model(&user).Association("Roles").Append(&role)
}

// RemoveRoleFromUser 移除用户角色
func (s *UserService) RemoveRoleFromUser(userID, roleID uint) error {
	var user model.User
	var role model.Role

	if err := database.DB.First(&user, userID).Error; err != nil {
		return err
	}

	if err := database.DB.First(&role, roleID).Error; err != nil {
		return err
	}

	return database.DB.Model(&user).Association("Roles").Delete(&role)
}

// GetUserRoles 获取用户的所有角色
func (s *UserService) GetUserRoles(userID uint) ([]model.Role, error) {
	var user model.User
	if err := database.DB.Preload("Roles").First(&user, userID).Error; err != nil {
		return nil, err
	}
	return user.Roles, nil
}

// UserExists 检查用户是否存在
func (s *UserService) UserExists(username, email string) (bool, error) {
	var count int64
	err := database.DB.Model(&model.User{}).
		Where("username = ? OR email = ?", username, email).
		Count(&count).Error
	
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return false, err
	}
	
	return count > 0, nil
}

