package rbac

import (
	"fmt"
	"log/slog"

	"github.com/casbin/casbin/v2"
	gormadapter "github.com/casbin/gorm-adapter/v3"
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/config"
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/database"
)

var Enforcer *casbin.Enforcer

// InitCasbin 初始化Casbin
func InitCasbin(cfg *config.CasbinConfig) error {
	// 使用GORM适配器（将策略存储在数据库中）
	adapter, err := gormadapter.NewAdapterByDB(database.DB)
	if err != nil {
		return fmt.Errorf("failed to create casbin adapter: %w", err)
	}

	// 创建enforcer
	Enforcer, err = casbin.NewEnforcer(cfg.ModelPath, adapter)
	if err != nil {
		return fmt.Errorf("failed to create casbin enforcer: %w", err)
	}

	// 从数据库加载策略
	if err := Enforcer.LoadPolicy(); err != nil {
		return fmt.Errorf("failed to load policy: %w", err)
	}

	slog.Info("Casbin 初始化成功")
	return nil
}

// InitDefaultPolicies 初始化默认策略
func InitDefaultPolicies() error {
	// 添加默认角色
	roles := []struct {
		name string
		desc string
	}{
		{"admin", "管理员"},
		{"user", "普通用户"},
		{"guest", "访客"},
	}

	// 添加默认权限策略
	policies := [][]string{
		// 管理员权限
		{"admin", "/api/users", "GET"},
		{"admin", "/api/users", "POST"},
		{"admin", "/api/users", "PUT"},
		{"admin", "/api/users", "DELETE"},
		{"admin", "/api/users/:id", "GET"},
		{"admin", "/api/users/:id", "PUT"},
		{"admin", "/api/users/:id", "DELETE"},
		{"admin", "/api/roles", "GET"},
		{"admin", "/api/roles", "POST"},
		{"admin", "/api/roles", "PUT"},
		{"admin", "/api/roles", "DELETE"},
		{"admin", "/api/permissions", "GET"},
		{"admin", "/api/permissions", "POST"},
		{"admin", "/api/permissions", "PUT"},
		{"admin", "/api/permissions", "DELETE"},
		{"admin", "/api/dashboard", "GET"},

		// 普通用户权限
		{"user", "/api/users/profile", "GET"},
		{"user", "/api/users/profile", "PUT"},
		{"user", "/api/dashboard", "GET"},

		// 访客权限
		{"guest", "/api/public", "GET"},
	}

	// 添加策略
	for _, policy := range policies {
		_, err := Enforcer.AddPolicy(policy)
		if err != nil {
			slog.Warn("添加策略失败", "policy", policy, "error", err)
		}
	}

	// 保存策略
	if err := Enforcer.SavePolicy(); err != nil {
		return fmt.Errorf("failed to save policy: %w", err)
	}

	slog.Info("默认策略初始化完成", "roles", len(roles), "policies", len(policies))
	return nil
}

// CheckPermission 检查权限
func CheckPermission(role, resource, action string) (bool, error) {
	return Enforcer.Enforce(role, resource, action)
}

// AddRoleForUser 为用户添加角色
func AddRoleForUser(username, role string) (bool, error) {
	return Enforcer.AddRoleForUser(username, role)
}

// DeleteRoleForUser 删除用户角色
func DeleteRoleForUser(username, role string) (bool, error) {
	return Enforcer.DeleteRoleForUser(username, role)
}

// GetRolesForUser 获取用户的所有角色
func GetRolesForUser(username string) ([]string, error) {
	return Enforcer.GetRolesForUser(username)
}

// GetUsersForRole 获取角色的所有用户
func GetUsersForRole(role string) ([]string, error) {
	return Enforcer.GetUsersForRole(role)
}

// AddPolicy 添加策略
func AddPolicy(role, resource, action string) (bool, error) {
	ok, err := Enforcer.AddPolicy(role, resource, action)
	if err != nil {
		return false, err
	}
	return ok, Enforcer.SavePolicy()
}

// RemovePolicy 删除策略
func RemovePolicy(role, resource, action string) (bool, error) {
	ok, err := Enforcer.RemovePolicy(role, resource, action)
	if err != nil {
		return false, err
	}
	return ok, Enforcer.SavePolicy()
}

// GetPoliciesForRole 获取角色的所有策略
func GetPoliciesForRole(role string) [][]string {
	return Enforcer.GetFilteredPolicy(0, role)
}

