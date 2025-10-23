# 快速开始指南

## 项目说明

这是一个基于 **Gin + Casbin + PostgreSQL + Redis** 的完整 REST API 实现，包含：

- ✅ JWT 身份认证
- ✅ RBAC 权限控制（基于 Casbin）
- ✅ 用户、角色、权限管理
- ✅ PostgreSQL 数据持久化
- ✅ Redis 缓存支持
- ✅ 完整的中间件系统
- ✅ Docker Compose 本地开发环境
- ✅ 优雅的错误处理和日志记录

## 快速启动

### 1️⃣ 启动数据库服务

```bash
# 启动 PostgreSQL 和 Redis
docker-compose up -d

# 查看服务状态
docker-compose ps
```

### 2️⃣ 初始化数据库

```bash
# 运行数据库迁移
go run main.go server migrate
```

### 3️⃣ 启动 API 服务器

```bash
# 启动服务器（带自动迁移和策略初始化）
go run main.go server start --migrate --init-policy

# 或者简写
go run main.go server start -m -p
```

服务器将在 `http://localhost:8080` 启动。

### 4️⃣ 测试 API

#### 方式一：使用测试脚本

```bash
# 自动化测试所有 API
./scripts/test-api.sh
```

#### 方式二：使用 curl 手动测试

```bash
# 1. 健康检查
curl http://localhost:8080/api/health

# 2. 注册用户
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "Admin@123456",
    "nickname": "系统管理员"
  }'

# 3. 登录获取 Token
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "Admin@123456"
  }'

# 保存返回的 token
export TOKEN="your_token_here"

# 4. 获取个人信息
curl http://localhost:8080/api/users/profile \
  -H "Authorization: Bearer $TOKEN"

# 5. 访问仪表板
curl http://localhost:8080/api/dashboard \
  -H "Authorization: Bearer $TOKEN"
```

#### 方式三：使用 Postman

导入 `docs/postman-collection.json` 到 Postman：

1. 打开 Postman
2. 点击 Import
3. 选择 `docs/postman-collection.json`
4. 设置环境变量 `baseUrl` 为 `http://localhost:8080`
5. 开始测试

## 目录结构

```
250730-vuetifyjs-template/
├── app/server/              # 后端 REST API
│   ├── api/                 # API 处理器
│   ├── config/              # 配置管理
│   ├── database/            # 数据库连接
│   ├── middleware/          # 中间件
│   ├── model/               # 数据模型
│   ├── rbac/                # 权限控制
│   ├── router/              # 路由配置
│   ├── service/             # 业务逻辑
│   └── command.go           # CLI 命令
├── configs/                 # 配置文件
│   ├── rbac_model.conf      # Casbin 模型
│   └── rbac_policy.csv      # 默认策略
├── docs/                    # 文档
│   ├── api-design.md        # API 设计文档
│   ├── server-api-readme.md # 服务器 API 说明
│   ├── QUICK_START.md       # 快速开始
│   └── postman-collection.json # Postman 集合
├── scripts/                 # 脚本
│   └── test-api.sh          # API 测试脚本
├── docker-compose.yml       # Docker 配置
├── .env.example             # 环境变量示例
└── main.go                  # 入口文件
```

## 环境配置

### 复制环境变量文件

```bash
cp .env.example .env
```

### 主要配置项

| 配置项 | 默认值 | 说明 |
|-------|--------|------|
| `SERVER_PORT` | 8080 | 服务器端口 |
| `DB_HOST` | localhost | PostgreSQL 地址 |
| `DB_PORT` | 5432 | PostgreSQL 端口 |
| `DB_NAME` | vuetify_app | 数据库名称 |
| `REDIS_HOST` | localhost | Redis 地址 |
| `JWT_SECRET` | ... | JWT 密钥（生产环境必须修改） |

## API 端点

### 公开接口（无需认证）

- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/health` - 健康检查

### 需要认证的接口

- `GET /api/users/profile` - 获取个人信息
- `GET /api/dashboard` - 仪表板

### 需要管理员权限的接口

**用户管理**
- `GET /api/users` - 用户列表
- `GET /api/users/:id` - 获取用户
- `POST /api/users` - 创建用户
- `PUT /api/users/:id` - 更新用户
- `DELETE /api/users/:id` - 删除用户
- `POST /api/users/:id/roles` - 分配角色

**角色管理**
- `GET /api/roles` - 角色列表
- `POST /api/roles` - 创建角色
- `PUT /api/roles/:id` - 更新角色
- `DELETE /api/roles/:id` - 删除角色
- `POST /api/roles/:id/permissions` - 分配权限

**权限管理**
- `GET /api/permissions` - 权限列表
- `POST /api/permissions` - 创建权限
- `PUT /api/permissions/:id` - 更新权限
- `DELETE /api/permissions/:id` - 删除权限

## 权限模型

### 默认角色

| 角色 | 描述 | 权限范围 |
|-----|------|----------|
| `admin` | 管理员 | 所有 API 访问 |
| `user` | 普通用户 | 个人资料、仪表板 |
| `guest` | 访客 | 公开资源 |

### 为用户分配管理员角色

新注册的用户默认分配 `user` 角色。如需管理员权限，需要手动分配：

```go
// 在代码中或使用 Go REPL
rbac.AddRoleForUser("username", "admin")
```

或者在启动时添加到 `rbac.InitDefaultPolicies()` 函数中。

## CLI 命令

```bash
# 查看所有命令
go run main.go --help

# 启动服务器
go run main.go server start

# 启动时自动迁移
go run main.go server start --migrate

# 启动时初始化策略
go run main.go server start --init-policy

# 运行数据库迁移
go run main.go server migrate

# 查看版本
go run main.go version
```

## 常见问题

### Q: 无法连接数据库？

**A:** 确保 Docker 容器正在运行：
```bash
docker-compose ps
docker-compose logs postgres
```

### Q: JWT Token 无效？

**A:** 检查：
1. Token 是否正确复制（包含 Bearer 前缀）
2. Token 是否过期（默认 24 小时）
3. JWT_SECRET 是否一致

### Q: 403 权限不足？

**A:** 检查：
1. 用户是否登录
2. 用户是否有对应角色
3. 查看 Casbin 策略配置

### Q: 如何查看日志？

**A:** 
```bash
# 查看数据库日志
docker-compose logs -f postgres

# 查看 Redis 日志
docker-compose logs -f redis

# 服务器日志在控制台输出
```

## 开发建议

1. **开发环境**：使用 `SERVER_MODE=debug`
2. **生产环境**：
   - 修改 `JWT_SECRET`
   - 设置 `SERVER_MODE=release`
   - 启用 PostgreSQL SSL
   - 配置 Redis 密码
3. **测试**：使用提供的测试脚本或 Postman 集合
4. **监控**：添加日志收集和监控系统

## 下一步

- 📖 阅读完整的 [API 设计文档](./api-design.md)
- 📖 查看 [服务器 API 说明](./server-api-readme.md)
- 🔧 自定义权限策略（修改 `configs/rbac_policy.csv`）
- 🚀 部署到生产环境

## 技术支持

如有问题，请查看：
- [Gin 文档](https://gin-gonic.com/docs/)
- [Casbin 文档](https://casbin.org/docs/)
- [GORM 文档](https://gorm.io/docs/)
- 项目文档目录 `docs/`

