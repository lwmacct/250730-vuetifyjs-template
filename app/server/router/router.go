package router

import (
	"github.com/gin-gonic/gin"
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/api"
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/config"
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/middleware"
)

// SetupRouter 设置路由
func SetupRouter(cfg *config.Config) *gin.Engine {
	// 设置Gin模式
	gin.SetMode(cfg.Server.Mode)

	// 创建路由
	r := gin.New()

	// 使用中间件
	r.Use(middleware.Recovery())
	r.Use(middleware.Logger())
	r.Use(middleware.CORS())

	// API处理器
	authAPI := api.NewAuthAPI(cfg)
	userAPI := api.NewUserAPI()
	roleAPI := api.NewRoleAPI()
	permissionAPI := api.NewPermissionAPI()

	// 公开路由
	public := r.Group("/api")
	{
		public.POST("/auth/register", authAPI.Register)
		public.POST("/auth/login", authAPI.Login)
		
		// 健康检查
		public.GET("/health", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"code":    200,
				"message": "服务正常运行",
			})
		})
	}

	// 需要认证的路由
	auth := r.Group("/api")
	auth.Use(middleware.JWTAuth())
	{
		// 用户个人资料
		auth.GET("/users/profile", authAPI.GetProfile)
		auth.PUT("/users/profile", authAPI.GetProfile) // TODO: 实现更新资料
		
		// Dashboard
		auth.GET("/dashboard", func(c *gin.Context) {
			username, _ := c.Get("username")
			c.JSON(200, gin.H{
				"code":    200,
				"message": "欢迎来到仪表板",
				"data": gin.H{
					"username": username,
				},
			})
		})
	}

	// 需要认证和权限的路由
	authz := r.Group("/api")
	authz.Use(middleware.JWTAuth())
	authz.Use(middleware.CasbinAuth())
	{
		// 用户管理
		authz.GET("/users", userAPI.GetUsers)
		authz.GET("/users/:id", userAPI.GetUserByID)
		authz.POST("/users", userAPI.CreateUser)
		authz.PUT("/users/:id", userAPI.UpdateUser)
		authz.DELETE("/users/:id", userAPI.DeleteUser)
		authz.POST("/users/:id/roles", userAPI.AssignRole)

		// 角色管理
		authz.GET("/roles", roleAPI.GetRoles)
		authz.GET("/roles/:id", roleAPI.GetRoleByID)
		authz.POST("/roles", roleAPI.CreateRole)
		authz.PUT("/roles/:id", roleAPI.UpdateRole)
		authz.DELETE("/roles/:id", roleAPI.DeleteRole)
		authz.POST("/roles/:id/permissions", roleAPI.AssignPermission)

		// 权限管理
		authz.GET("/permissions", permissionAPI.GetPermissions)
		authz.GET("/permissions/:id", permissionAPI.GetPermissionByID)
		authz.POST("/permissions", permissionAPI.CreatePermission)
		authz.PUT("/permissions/:id", permissionAPI.UpdatePermission)
		authz.DELETE("/permissions/:id", permissionAPI.DeletePermission)
	}

	return r
}

