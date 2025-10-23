package database

import (
	"log/slog"

	"github.com/lwmacct/250730-vuetifyjs-template/app/server/model"
)

// AutoMigrate 自动迁移数据库
func AutoMigrate() error {
	slog.Info("开始数据库迁移...")
	
	err := DB.AutoMigrate(
		&model.User{},
		&model.Role{},
		&model.Permission{},
		&model.CasbinRule{},
	)
	
	if err != nil {
		slog.Error("数据库迁移失败", "error", err)
		return err
	}
	
	slog.Info("数据库迁移完成")
	return nil
}

