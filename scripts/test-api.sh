#!/bin/bash
# shellcheck disable=all

# API 测试脚本

_api_url="http://localhost:8080"
_token=""

# 颜色输出
_echo_success() {
  echo -e "\033[32m✓ $1\033[0m"
}

_echo_error() {
  echo -e "\033[31m✗ $1\033[0m"
}

_echo_info() {
  echo -e "\033[34mℹ $1\033[0m"
}

# 健康检查
__test_health() {
  _echo_info "测试健康检查..."
  response=$(curl -s "${_api_url}/api/health")
  if echo "$response" | grep -q "服务正常运行"; then
    _echo_success "健康检查通过"
    echo "$response" | jq .
  else
    _echo_error "健康检查失败"
    exit 1
  fi
}

# 用户注册
__test_register() {
  _echo_info "测试用户注册..."
  response=$(curl -s -X POST "${_api_url}/api/auth/register" \
    -H "Content-Type: application/json" \
    -d '{
      "username": "testuser",
      "email": "test@example.com",
      "password": "Test@123456",
      "nickname": "测试用户"
    }')
  
  if echo "$response" | grep -q "注册成功"; then
    _echo_success "用户注册成功"
    echo "$response" | jq .
  else
    _echo_error "用户注册失败"
    echo "$response" | jq .
  fi
}

# 用户登录
__test_login() {
  _echo_info "测试用户登录..."
  response=$(curl -s -X POST "${_api_url}/api/auth/login" \
    -H "Content-Type: application/json" \
    -d '{
      "username": "testuser",
      "password": "Test@123456"
    }')
  
  if echo "$response" | grep -q "登录成功"; then
    _echo_success "用户登录成功"
    _token=$(echo "$response" | jq -r '.data.token')
    echo "$response" | jq .
    _echo_info "Token: $_token"
  else
    _echo_error "用户登录失败"
    echo "$response" | jq .
    exit 1
  fi
}

# 获取个人信息
__test_profile() {
  _echo_info "测试获取个人信息..."
  
  if [ -z "$_token" ]; then
    _echo_error "Token 为空，请先登录"
    exit 1
  fi
  
  response=$(curl -s -X GET "${_api_url}/api/users/profile" \
    -H "Authorization: Bearer $_token")
  
  if echo "$response" | grep -q "成功"; then
    _echo_success "获取个人信息成功"
    echo "$response" | jq .
  else
    _echo_error "获取个人信息失败"
    echo "$response" | jq .
  fi
}

# 访问仪表板
__test_dashboard() {
  _echo_info "测试访问仪表板..."
  
  if [ -z "$_token" ]; then
    _echo_error "Token 为空，请先登录"
    exit 1
  fi
  
  response=$(curl -s -X GET "${_api_url}/api/dashboard" \
    -H "Authorization: Bearer $_token")
  
  if echo "$response" | grep -q "欢迎"; then
    _echo_success "访问仪表板成功"
    echo "$response" | jq .
  else
    _echo_error "访问仪表板失败"
    echo "$response" | jq .
  fi
}

# 注册管理员用户
__register_admin() {
  _echo_info "注册管理员用户..."
  response=$(curl -s -X POST "${_api_url}/api/auth/register" \
    -H "Content-Type: application/json" \
    -d '{
      "username": "admin",
      "email": "admin@example.com",
      "password": "Admin@123456",
      "nickname": "系统管理员"
    }')
  
  if echo "$response" | grep -q "注册成功\|已存在"; then
    _echo_success "管理员用户准备完成"
    echo "$response" | jq .
  else
    _echo_error "管理员注册失败"
    echo "$response" | jq .
  fi
}

# 管理员登录
__login_admin() {
  _echo_info "管理员登录..."
  response=$(curl -s -X POST "${_api_url}/api/auth/login" \
    -H "Content-Type: application/json" \
    -d '{
      "username": "admin",
      "password": "Admin@123456"
    }')
  
  if echo "$response" | grep -q "登录成功"; then
    _echo_success "管理员登录成功"
    _token=$(echo "$response" | jq -r '.data.token')
    echo "$response" | jq .
    _echo_info "Admin Token: $_token"
  else
    _echo_error "管理员登录失败"
    echo "$response" | jq .
  fi
}

# 测试权限（管理员才能访问）
__test_admin_access() {
  _echo_info "测试管理员权限（获取用户列表）..."
  
  if [ -z "$_token" ]; then
    _echo_error "Token 为空，请先登录"
    exit 1
  fi
  
  response=$(curl -s -X GET "${_api_url}/api/users?page=1&page_size=10" \
    -H "Authorization: Bearer $_token")
  
  # 检查是否有权限
  if echo "$response" | grep -q "无权限"; then
    _echo_error "无权限访问（这是正常的，需要管理员角色）"
    echo "$response" | jq .
  elif echo "$response" | grep -q "成功"; then
    _echo_success "管理员权限访问成功"
    echo "$response" | jq .
  else
    _echo_error "请求失败"
    echo "$response" | jq .
  fi
}

# 主函数
__main() {
  echo "========================================="
  echo "REST API 测试脚本"
  echo "========================================="
  echo ""
  
  # 基础测试
  __test_health
  echo ""
  
  __test_register
  echo ""
  
  __test_login
  echo ""
  
  __test_profile
  echo ""
  
  __test_dashboard
  echo ""
  
  # 管理员测试
  __register_admin
  echo ""
  
  __login_admin
  echo ""
  
  __test_admin_access
  echo ""
  
  echo "========================================="
  echo "测试完成！"
  echo "========================================="
}

# 运行主函数
__main

