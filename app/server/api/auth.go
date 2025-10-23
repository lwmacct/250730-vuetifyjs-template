package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/config"
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/middleware"
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/model"
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/rbac"
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/service"
)

// AuthAPI 认证API
type AuthAPI struct {
	userService *service.UserService
	cfg         *config.Config
}

// NewAuthAPI 创建认证API
func NewAuthAPI(cfg *config.Config) *AuthAPI {
	return &AuthAPI{
		userService: &service.UserService{},
		cfg:         cfg,
	}
}

// RegisterRequest 注册请求
type RegisterRequest struct {
	Username string `json:"username" binding:"required,min=3,max=50"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
	Nickname string `json:"nickname"`
}

// LoginRequest 登录请求
type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// Register 用户注册
func (a *AuthAPI) Register(c *gin.Context) {
	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    400,
			"message": "请求参数错误",
			"error":   err.Error(),
		})
		return
	}

	// 检查用户是否已存在
	exists, err := a.userService.UserExists(req.Username, req.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    500,
			"message": "检查用户失败",
			"error":   err.Error(),
		})
		return
	}

	if exists {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    400,
			"message": "用户名或邮箱已存在",
		})
		return
	}

	// 创建用户
	user := &model.User{
		Username: req.Username,
		Email:    req.Email,
		Password: req.Password,
		Nickname: req.Nickname,
		Status:   1,
	}

	if err := a.userService.CreateUser(user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    500,
			"message": "创建用户失败",
			"error":   err.Error(),
		})
		return
	}

	// 分配默认角色（user）
	_, _ = rbac.AddRoleForUser(user.Username, "user")

	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "注册成功",
		"data": gin.H{
			"id":       user.ID,
			"username": user.Username,
			"email":    user.Email,
		},
	})
}

// Login 用户登录
func (a *AuthAPI) Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    400,
			"message": "请求参数错误",
			"error":   err.Error(),
		})
		return
	}

	// 查找用户
	user, err := a.userService.GetUserByUsername(req.Username)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":    401,
			"message": "用户名或密码错误",
		})
		return
	}

	// 验证密码
	if err := a.userService.VerifyPassword(user, req.Password); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":    401,
			"message": "用户名或密码错误",
		})
		return
	}

	// 检查用户状态
	if user.Status != 1 {
		c.JSON(http.StatusForbidden, gin.H{
			"code":    403,
			"message": "用户已被禁用",
		})
		return
	}

	// 获取用户角色
	roles, _ := rbac.GetRolesForUser(user.Username)
	if len(roles) == 0 {
		roles = []string{"user"} // 默认角色
	}

	// 生成Token
	token, err := middleware.GenerateToken(user.ID, user.Username, roles, &a.cfg.JWT)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    500,
			"message": "生成Token失败",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "登录成功",
		"data": gin.H{
			"token":    token,
			"user_id":  user.ID,
			"username": user.Username,
			"nickname": user.Nickname,
			"email":    user.Email,
			"roles":    roles,
		},
	})
}

// GetProfile 获取当前用户信息
func (a *AuthAPI) GetProfile(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":    401,
			"message": "未授权",
		})
		return
	}

	user, err := a.userService.GetUserByID(userID.(uint))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    500,
			"message": "获取用户信息失败",
			"error":   err.Error(),
		})
		return
	}

	// 获取用户角色
	roles, _ := rbac.GetRolesForUser(user.Username)

	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "成功",
		"data": gin.H{
			"id":       user.ID,
			"username": user.Username,
			"nickname": user.Nickname,
			"email":    user.Email,
			"avatar":   user.Avatar,
			"status":   user.Status,
			"roles":    roles,
		},
	})
}

