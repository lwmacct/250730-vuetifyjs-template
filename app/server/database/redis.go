package database

import (
	"context"
	"fmt"
	"log/slog"

	"github.com/lwmacct/250730-vuetifyjs-template/app/server/config"
	"github.com/redis/go-redis/v9"
)

var RDB *redis.Client

// InitRedis 初始化Redis连接
func InitRedis(cfg *config.RedisConfig) error {
	RDB = redis.NewClient(&redis.Options{
		Addr:     cfg.RedisAddr(),
		Password: cfg.Password,
		DB:       cfg.DB,
		PoolSize: cfg.PoolSize,
	})

	// 测试连接
	ctx := context.Background()
	if err := RDB.Ping(ctx).Err(); err != nil {
		return fmt.Errorf("failed to connect to redis: %w", err)
	}

	slog.Info("Redis 连接成功", "host", cfg.Host, "port", cfg.Port)
	return nil
}

// CloseRedis 关闭Redis连接
func CloseRedis() error {
	if RDB != nil {
		return RDB.Close()
	}
	return nil
}

