package config

import (
	"fmt"
	"os"
	"strconv"
	"time"
)

// Config 应用配置
type Config struct {
	Server     ServerConfig
	Database   DatabaseConfig
	Redis      RedisConfig
	JWT        JWTConfig
	Casbin     CasbinConfig
}

// ServerConfig 服务器配置
type ServerConfig struct {
	Port         int
	Mode         string // debug, release, test
	ReadTimeout  time.Duration
	WriteTimeout time.Duration
}

// DatabaseConfig 数据库配置
type DatabaseConfig struct {
	Host     string
	Port     int
	User     string
	Password string
	DBName   string
	SSLMode  string
	MaxOpen  int
	MaxIdle  int
	MaxLife  time.Duration
}

// RedisConfig Redis配置
type RedisConfig struct {
	Host     string
	Port     int
	Password string
	DB       int
	PoolSize int
}

// JWTConfig JWT配置
type JWTConfig struct {
	Secret     string
	ExpireTime time.Duration
	Issuer     string
}

// CasbinConfig Casbin配置
type CasbinConfig struct {
	ModelPath  string
	PolicyFile string
}

// Load 加载配置
func Load() *Config {
	return &Config{
		Server: ServerConfig{
			Port:         getEnvAsInt("SERVER_PORT", 8080),
			Mode:         getEnv("SERVER_MODE", "debug"),
			ReadTimeout:  time.Duration(getEnvAsInt("SERVER_READ_TIMEOUT", 15)) * time.Second,
			WriteTimeout: time.Duration(getEnvAsInt("SERVER_WRITE_TIMEOUT", 15)) * time.Second,
		},
		Database: DatabaseConfig{
			Host:     getEnv("DB_HOST", "localhost"),
			Port:     getEnvAsInt("DB_PORT", 5432),
			User:     getEnv("DB_USER", "postgres"),
			Password: getEnv("DB_PASSWORD", "postgres"),
			DBName:   getEnv("DB_NAME", "vuetify_app"),
			SSLMode:  getEnv("DB_SSLMODE", "disable"),
			MaxOpen:  getEnvAsInt("DB_MAX_OPEN", 25),
			MaxIdle:  getEnvAsInt("DB_MAX_IDLE", 5),
			MaxLife:  time.Duration(getEnvAsInt("DB_MAX_LIFE", 300)) * time.Second,
		},
		Redis: RedisConfig{
			Host:     getEnv("REDIS_HOST", "localhost"),
			Port:     getEnvAsInt("REDIS_PORT", 6379),
			Password: getEnv("REDIS_PASSWORD", ""),
			DB:       getEnvAsInt("REDIS_DB", 0),
			PoolSize: getEnvAsInt("REDIS_POOL_SIZE", 10),
		},
		JWT: JWTConfig{
			Secret:     getEnv("JWT_SECRET", "your-secret-key-change-in-production"),
			ExpireTime: time.Duration(getEnvAsInt("JWT_EXPIRE_HOURS", 24)) * time.Hour,
			Issuer:     getEnv("JWT_ISSUER", "vuetify-app"),
		},
		Casbin: CasbinConfig{
			ModelPath:  getEnv("CASBIN_MODEL_PATH", "./configs/rbac_model.conf"),
			PolicyFile: getEnv("CASBIN_POLICY_FILE", "./configs/rbac_policy.csv"),
		},
	}
}

// DSN 返回数据库连接字符串
func (d *DatabaseConfig) DSN() string {
	return fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		d.Host, d.Port, d.User, d.Password, d.DBName, d.SSLMode)
}

// RedisAddr 返回Redis地址
func (r *RedisConfig) RedisAddr() string {
	return fmt.Sprintf("%s:%d", r.Host, r.Port)
}

// getEnv 获取环境变量，如果不存在则返回默认值
func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

// getEnvAsInt 获取整型环境变量，如果不存在则返回默认值
func getEnvAsInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		if intValue, err := strconv.Atoi(value); err == nil {
			return intValue
		}
	}
	return defaultValue
}

