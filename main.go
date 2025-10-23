package main

import (
	"context"
	"log"
	"os"

	"github.com/urfave/cli/v3"

	"github.com/lwmacct/250730-vuetifyjs-template/app/server"
	"github.com/lwmacct/250730-vuetifyjs-template/app/server/config"
	"github.com/lwmacct/250730-vuetifyjs-template/app/version"
)

// buildCommands 根据环境变量条件性构建命令列表
func buildCommands() []*cli.Command {
	commands := []*cli.Command{
		version.Command,
		server.Command,
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
			&cli.StringFlag{
				Name:    "env-prefix",
				Usage:   "环境变量前缀，例如: APP_",
				Value:   "",
				Sources: cli.EnvVars("ENV_PREFIX"),
			},
		},
		Commands: buildCommands(),
		Before: func(ctx context.Context, cmd *cli.Command) error {
			if prefix := cmd.String("env-prefix"); prefix != "" {
				config.SetEnvPrefix(prefix)
			}
			return nil
		},
	}

	if err := cmd.Run(context.Background(), os.Args); err != nil {
		log.Fatal(err)
	}
}
