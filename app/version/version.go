package version

import (
	"fmt"
	"runtime"
)

// 这些变量将在构建时通过 -ldflags -X 进行注入
var (
	AppRawName string = "Unknown" // 应用名称
	AppProject string = "Unknown" // 项目名称
	AppVersion string = "Unknown" // 应用版本
	GitCommit  string = "Unknown" // Git提交
	BuildTime  string = "Unknown" // 编译时间
	Developer  string = "Unknown" // 开发者
	Workspace  string = "Unknown" // 工作目录, 用于去除callstack中的绝对路径
)

// PrintVersion 打印版本信息
func PrintVersion() {
	fmt.Printf("AppRawName:   %s\n", AppRawName)
	fmt.Printf("AppVersion:   %s\n", AppVersion)
	fmt.Printf("Go Version:   %s\n", runtime.Version())
	fmt.Printf("Git Commit:   %s\n", GitCommit)
	fmt.Printf("Build Time:   %s\n", BuildTime)
	fmt.Printf("AppProject:   %s\n", AppProject)
	fmt.Printf("Developer :   %s\n", Developer)
}

// GetVersion 返回应用版本号
func GetVersion() string {
	if AppVersion == "Unknown" && GitCommit != "Unknown" && len(GitCommit) > 7 {
		return fmt.Sprintf("dev-%s", GitCommit[:7])
	}
	return AppVersion
}

// GetShortVersion 返回简短版本号 (兼容性函数)
func GetShortVersion() string {
	return AppVersion
}

// GetBuildInfo 返回构建相关信息 (用于健康检查等)
func GetBuildInfo() string {
	return fmt.Sprintf("版本: %s, 提交: %s, 构建时间: %s", AppVersion, GitCommit, BuildTime)
}

