package server

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/lwmacct/250730-vuetifyjs-template/app/server/config"
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/database"
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/middleware"
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/rbac"
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/router"
	"github.com/urfave/cli/v3"
)

// Command 服务器命令
var action = &Action{}

var Command = &cli.Command{
	Name:  "server",
	Usage: "启动服务器",
	Commands: []*cli.Command{
		{
			Name:   "start",
			Usage:  "启动 REST API 服务器",
			Action: action.start,
			Flags: []cli.Flag{
				&cli.BoolFlag{
					Name:    "migrate",
					Usage:   "启动时自动迁移数据库",
					Aliases: []string{"m"},
					Value:   false,
				},
				&cli.BoolFlag{
					Name:    "init-policy",
					Usage:   "初始化默认权限策略",
					Aliases: []string{"p"},
					Value:   false,
				},
			},
		},
		{
			Name:   "migrate",
			Usage:  "运行数据库迁移",
			Action: action.migrate,
		},
	},
}

type Action struct{}

func (a *Action) start(ctx context.Context, cmd *cli.Command) error {
	// 加载配置
	cfg := config.Load()
	slog.Info("配置加载完成")

	// 初始化数据库
	if err := database.InitPostgreSQL(&cfg.Database); err != nil {
		slog.Error("PostgreSQL 初始化失败", "error", err)
		return err
	}
	defer database.ClosePostgreSQL()

	// 初始化Redis
	if err := database.InitRedis(&cfg.Redis); err != nil {
		slog.Error("Redis 初始化失败", "error", err)
		return err
	}
	defer database.CloseRedis()

	// 自动迁移数据库（如果指定）
	if cmd.Bool("migrate") {
		if err := database.AutoMigrate(); err != nil {
			slog.Error("数据库迁移失败", "error", err)
			return err
		}
	}

	// 初始化Casbin
	if err := rbac.InitCasbin(&cfg.Casbin); err != nil {
		slog.Error("Casbin 初始化失败", "error", err)
		return err
	}

	// 初始化默认策略（如果指定）
	if cmd.Bool("init-policy") {
		if err := rbac.InitDefaultPolicies(); err != nil {
			slog.Error("初始化默认策略失败", "error", err)
			return err
		}
	}

	// 初始化JWT
	middleware.InitJWT(&cfg.JWT)

	// 设置路由
	r := router.SetupRouter(cfg)

	// 创建HTTP服务器
	addr := fmt.Sprintf(":%d", cfg.Server.Port)
	srv := &http.Server{
		Addr:           addr,
		Handler:        r,
		ReadTimeout:    cfg.Server.ReadTimeout,
		WriteTimeout:   cfg.Server.WriteTimeout,
		MaxHeaderBytes: 1 << 20, // 1MB
	}

	// 启动服务器
	go func() {
		slog.Info("服务器启动成功", "addr", addr, "mode", cfg.Server.Mode)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			slog.Error("服务器启动失败", "error", err)
			os.Exit(1)
		}
	}()

	// 优雅关闭
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	slog.Info("正在关闭服务器...")

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := srv.Shutdown(shutdownCtx); err != nil {
		slog.Error("服务器关闭异常", "error", err)
		return err
	}

	slog.Info("服务器已关闭")
	return nil
}

func (a *Action) migrate(ctx context.Context, cmd *cli.Command) error {
	// 加载配置
	cfg := config.Load()

	// 初始化数据库
	if err := database.InitPostgreSQL(&cfg.Database); err != nil {
		slog.Error("PostgreSQL 初始化失败", "error", err)
		return err
	}
	defer database.ClosePostgreSQL()

	// 执行迁移
	if err := database.AutoMigrate(); err != nil {
		slog.Error("数据库迁移失败", "error", err)
		return err
	}

	slog.Info("数据库迁移完成")
	return nil
}