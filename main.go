package main

import (
	"context"
	"log"
	"os"

	"github.com/urfave/cli/v3"

	"github.com/lwmacct/250730-vuetifyjs-template/app/version"
)

// buildCommands 根据环境变量条件性构建命令列表
func buildCommands() []*cli.Command {
	commands := []*cli.Command{
		version.Command,
	}

	if os.Getenv("SHOW_CLI_ITEM") == "1" {
		commands = append([]*cli.Command{}, commands...)
	}
	return commands
}

func main() {
	cmd := &cli.Command{
		Usage: version.AppProject,
		Flags: []cli.Flag{
		},
		Commands: buildCommands(),
	}

	if err := cmd.Run(context.Background(), os.Args); err != nil {
		log.Fatal(err)
	}
}
