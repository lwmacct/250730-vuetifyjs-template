# REST API 服务器说明

## 技术架构

本项目实现了一个完整的 REST API 服务，采用以下技术栈：

- **Web框架**: Gin (高性能 HTTP 框架)
- **权限控制**: Casbin (RBAC 基于角色的访问控制)
- **数据库**: PostgreSQL (关系型数据库)
- **缓存**: Redis (内存数据库)
- **ORM**: GORM (对象关系映射)
- **认证**: JWT (JSON Web Token)
- **密码加密**: bcrypt

## 项目结构

```
app/server/
├── api/           # API 处理器
│   ├── auth.go    # 认证相关 API (注册、登录)
│   ├── user.go    # 用户管理 API
│   ├── role.go    # 角色管理 API
│   └── permission.go # 权限管理 API
├── config/        # 配置管理
│   └── config.go  # 配置加载和结构定义
├── database/      # 数据库层
│   ├── postgres.go # PostgreSQL 连接
│   ├── redis.go   # Redis 连接
│   └── migrate.go # 数据库迁移
├── middleware/    # 中间件
│   ├── jwt.go     # JWT 认证中间件
│   ├── casbin.go  # Casbin 权限中间件
│   ├── cors.go    # CORS 跨域中间件
│   ├── logger.go  # 日志中间件
│   └── recovery.go # 异常恢复中间件
├── model/         # 数据模型
│   └── user.go    # User, Role, Permission 模型
├── rbac/          # RBAC 权限控制
│   └── enforcer.go # Casbin Enforcer
├── router/        # 路由配置
│   └── router.go  # 路由设置
├── service/       # 业务逻辑层
│   ├── user_service.go
│   ├── role_service.go
│   └── permission_service.go
└── command.go     # CLI 命令

configs/
├── rbac_model.conf  # Casbin RBAC 模型
└── rbac_policy.csv  # 默认权限策略
```

## 快速开始

### 1. 启动依赖服务

使用 Docker Compose 启动 PostgreSQL 和 Redis：

```bash
docker-compose up -d
```

### 2. 配置环境变量

复制 `.env.example` 到 `.env` 并修改配置：

```bash
cp .env.example .env
```

### 3. 运行数据库迁移

```bash
go run main.go server migrate
```

### 4. 启动服务器

#### 方式一：基本启动
```bash
go run main.go server start
```

#### 方式二：启动时自动迁移和初始化
```bash
go run main.go server start --migrate --init-policy
```

### 5. 验证服务

```bash
curl http://localhost:8080/api/health
```

## API 使用示例

### 1. 用户注册

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "Admin@123456",
    "nickname": "管理员"
  }'
```

### 2. 用户登录

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "Admin@123456"
  }'
```

返回示例：
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user_id": 1,
    "username": "admin",
    "nickname": "管理员",
    "email": "admin@example.com",
    "roles": ["user"]
  }
}
```

### 3. 获取个人信息

```bash
curl -X GET http://localhost:8080/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. 为用户分配管理员角色

首先，你需要在数据库中创建管理员角色，或使用 Casbin 添加角色关系：

```bash
# 使用 Go 代码或直接操作数据库
# rbac.AddRoleForUser("admin", "admin")
```

### 5. 获取用户列表（需要管理员权限）

```bash
curl -X GET "http://localhost:8080/api/users?page=1&page_size=10" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

## 权限管理

### 默认角色和权限

| 角色 | 权限 |
|-----|------|
| admin | 所有 API 的完全访问权限 |
| user | 个人资料、仪表板访问 |
| guest | 仅公开资源 |

### 为用户分配角色

使用 Casbin 的 API 或通过管理接口：

```go
rbac.AddRoleForUser("username", "admin")
```

### 添加自定义权限

```bash
curl -X POST http://localhost:8080/api/permissions \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "read_reports",
    "display_name": "读取报告",
    "description": "允许读取系统报告",
    "resource": "/api/reports",
    "action": "GET"
  }'
```

## CLI 命令

### 服务器命令

```bash
# 启动服务器
go run main.go server start

# 启动时自动迁移数据库
go run main.go server start --migrate

# 启动时初始化默认权限策略
go run main.go server start --init-policy

# 同时迁移和初始化
go run main.go server start -m -p

# 仅运行数据库迁移
go run main.go server migrate
```

### 版本信息

```bash
go run main.go version
```

## 环境配置

### 服务器配置

| 变量 | 说明 | 默认值 |
|-----|------|--------|
| SERVER_PORT | 服务器端口 | 8080 |
| SERVER_MODE | 运行模式 (debug/release) | debug |
| SERVER_READ_TIMEOUT | 读取超时（秒） | 15 |
| SERVER_WRITE_TIMEOUT | 写入超时（秒） | 15 |

### 数据库配置

| 变量 | 说明 | 默认值 |
|-----|------|--------|
| DB_HOST | PostgreSQL 主机 | localhost |
| DB_PORT | PostgreSQL 端口 | 5432 |
| DB_USER | 数据库用户名 | postgres |
| DB_PASSWORD | 数据库密码 | postgres |
| DB_NAME | 数据库名称 | vuetify_app |
| DB_SSLMODE | SSL 模式 | disable |

### Redis 配置

| 变量 | 说明 | 默认值 |
|-----|------|--------|
| REDIS_HOST | Redis 主机 | localhost |
| REDIS_PORT | Redis 端口 | 6379 |
| REDIS_PASSWORD | Redis 密码 | (空) |
| REDIS_DB | Redis 数据库编号 | 0 |

### JWT 配置

| 变量 | 说明 | 默认值 |
|-----|------|--------|
| JWT_SECRET | JWT 密钥 | your-secret-key-change-in-production |
| JWT_EXPIRE_HOURS | Token 过期时间（小时） | 24 |
| JWT_ISSUER | Token 签发者 | vuetify-app |

## 数据库设计

### 表结构

#### users (用户表)
- id (主键)
- username (唯一)
- email (唯一)
- password (加密)
- nickname
- avatar
- status
- created_at
- updated_at
- deleted_at

#### roles (角色表)
- id (主键)
- name (唯一)
- display_name
- description
- status
- created_at
- updated_at
- deleted_at

#### permissions (权限表)
- id (主键)
- name (唯一)
- display_name
- description
- resource
- action
- created_at
- updated_at
- deleted_at

#### user_roles (用户-角色关联表)
- user_id
- role_id

#### role_permissions (角色-权限关联表)
- role_id
- permission_id

#### casbin_rule (Casbin 规则表)
- 存储 Casbin 的策略规则

## 中间件说明

### 1. Logger 中间件
记录每个请求的详细信息：
- 请求方法
- 请求路径
- 响应状态码
- 处理时间
- 客户端 IP

### 2. Recovery 中间件
捕获运行时 panic，避免服务器崩溃

### 3. CORS 中间件
处理跨域请求，允许前端调用

### 4. JWT Auth 中间件
验证 JWT Token：
- 检查 Authorization header
- 验证 Bearer token 格式
- 解析和验证 token
- 将用户信息存入上下文

### 5. Casbin Auth 中间件
基于 RBAC 的权限验证：
- 从上下文获取用户角色
- 检查角色对资源的访问权限
- 支持多角色权限合并

## 安全建议

1. **生产环境必须修改 JWT_SECRET**
2. **使用强密码策略**（建议 8+ 字符，包含大小写、数字、特殊字符）
3. **启用 HTTPS**
4. **设置合理的 Token 过期时间**
5. **定期更新依赖包**
6. **记录和监控异常访问**
7. **限制 API 访问频率**（考虑添加 rate limiting）
8. **数据库连接使用 SSL**（生产环境）

## 测试

### 运行测试
```bash
go test ./app/server/...
```

### API 测试工具推荐
- Postman
- Insomnia
- curl
- httpie

## 故障排查

### 无法连接数据库
1. 检查 PostgreSQL 是否运行
2. 验证数据库配置
3. 检查网络连接

### JWT Token 无效
1. 检查 JWT_SECRET 是否一致
2. Token 是否过期
3. 验证 Authorization header 格式

### 权限验证失败
1. 检查用户是否有对应角色
2. 验证 Casbin 策略是否正确
3. 查看日志获取详细错误信息

## 开发建议

1. **代码组织**：保持清晰的分层架构
2. **错误处理**：统一错误响应格式
3. **日志记录**：记录关键操作和错误
4. **测试覆盖**：编写单元测试和集成测试
5. **文档维护**：及时更新 API 文档

## 扩展功能建议

1. **邮箱验证**：注册时发送验证邮件
2. **密码重置**：通过邮件重置密码
3. **多因素认证**：增强安全性
4. **OAuth2 登录**：支持第三方登录
5. **API 限流**：防止滥用
6. **日志审计**：记录重要操作
7. **数据备份**：定期备份数据库
8. **监控告警**：系统健康监控

## 参考资料

- [Gin 文档](https://gin-gonic.com/docs/)
- [Casbin 文档](https://casbin.org/docs/)
- [GORM 文档](https://gorm.io/docs/)
- [JWT 标准](https://jwt.io/)
- [PostgreSQL 文档](https://www.postgresql.org/docs/)
- [Redis 文档](https://redis.io/documentation)

