package database

import (
	"fmt"
	"log/slog"

	"github.com/lwmacct/250730-vuetifyjs-template/app/server/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

// InitPostgreSQL 初始化PostgreSQL数据库
func InitPostgreSQL(cfg *config.DatabaseConfig) error {
	var err error
	
	// GORM 配置
	gormConfig := &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	}

	// 连接数据库
	DB, err = gorm.Open(postgres.Open(cfg.DSN()), gormConfig)
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	// 获取底层的 sql.DB
	sqlDB, err := DB.DB()
	if err != nil {
		return fmt.Errorf("failed to get sql.DB: %w", err)
	}

	// 设置连接池
	sqlDB.SetMaxOpenConns(cfg.MaxOpen)
	sqlDB.SetMaxIdleConns(cfg.MaxIdle)
	sqlDB.SetConnMaxLifetime(cfg.MaxLife)

	// 测试连接
	if err := sqlDB.Ping(); err != nil {
		return fmt.Errorf("failed to ping database: %w", err)
	}

	slog.Info("PostgreSQL 数据库连接成功", "host", cfg.Host, "port", cfg.Port)
	return nil
}

// ClosePostgreSQL 关闭数据库连接
func ClosePostgreSQL() error {
	if DB != nil {
		sqlDB, err := DB.DB()
		if err != nil {
			return err
		}
		return sqlDB.Close()
	}
	return nil
}

