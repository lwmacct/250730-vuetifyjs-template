package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/rbac"
)

// CasbinAuth Casbin权限验证中间件
func CasbinAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 获取用户角色（从JWT中间件设置的上下文）
		roles, exists := c.Get("roles")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{
				"code":    401,
				"message": "未找到用户角色信息",
			})
			c.Abort()
			return
		}

		// 获取请求资源和操作
		resource := c.Request.URL.Path
		action := c.Request.Method

		// 检查权限（任一角色有权限即可）
		userRoles := roles.([]string)
		hasPermission := false

		for _, role := range userRoles {
			ok, err := rbac.CheckPermission(role, resource, action)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"code":    500,
					"message": "权限检查失败",
					"error":   err.Error(),
				})
				c.Abort()
				return
			}

			if ok {
				hasPermission = true
				break
			}
		}

		if !hasPermission {
			c.JSON(http.StatusForbidden, gin.H{
				"code":    403,
				"message": "无权限访问此资源",
				"resource": resource,
				"action":   action,
			})
			c.Abort()
			return
		}

		c.Next()
	}
}

