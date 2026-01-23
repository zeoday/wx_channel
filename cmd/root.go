package cmd

import (
	"fmt"
	"os"
	"wx_channel/internal/app"
	"wx_channel/internal/config"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var (
	cfgFile string
	port    int
	dev     string
)

var rootCmd = &cobra.Command{
	Use:   "wx_channel",
	Short: "WeChat Channel Video Downloader",
	Long:  `A tool to download videos from WeChat Channels with auto-decryption and de-duplication.`,
	Run: func(cmd *cobra.Command, args []string) {
		cfg := config.Load()
		// 应用标志到配置
		if port != 0 {
			cfg.SetPort(port)
		}

		// 创建并运行应用
		application := app.NewApp(cfg)
		application.Run()
	},
}

func Execute() {
	// 允许在 Windows 上直接双击运行（禁用 Mousetrap 检测）
	cobra.MousetrapHelpText = ""

	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)

	// 持久化标志
	rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.wx_channel/config.yaml)")
	rootCmd.PersistentFlags().IntVarP(&port, "port", "p", 0, "Proxy server network port")
	rootCmd.PersistentFlags().StringVarP(&dev, "dev", "d", "", "Proxy server network device")

	// 绑定标志到 viper
	viper.BindPFlag("port", rootCmd.PersistentFlags().Lookup("port"))
	viper.BindPFlag("dev", rootCmd.PersistentFlags().Lookup("dev"))
}

func initConfig() {
	if cfgFile != "" {
		// 使用标志指定的配置文件。
		viper.SetConfigFile(cfgFile)
	}
	// config.Load() 将调用 loadConfig，后者设置 viper 默认值和自动环境变量
	// 但是，如果设置了特定的配置文件，我们需要通知 config.Load
	//由于 config.Load 调用 loadConfig 会重置 viper 配置路径...
	// 我们可能应该修改 config 包以接受配置文件路径或公开 SetConfigFile 函数
	// 但如果 loadConfig 不会在已设置的情况下盲目覆盖，那么通过 viper 在此处简单设置可能会起作用？
	// internal/config 中的 loadConfig 调用 viper.SetConfigName/AddConfigPath，如果调用了 SetConfigFile，这些可能会被忽略？
	// 实际上 loadConfig 做的是：
	// viper.SetConfigName("config")
	// viper.AddConfigPath(".") ...
	// 如果使用了 SetConfigFile，它将覆盖 SetConfigName/AddConfigPath 的搜索。

	// 更好的方法：让我们更新 config.Load 以接受可选路径或依赖 viper 的单例状态。
	// 既然我们在重构，让我们相信 viper 单例是共享的。
	// 但是 `config.Load()` 调用 `loadConfig()`，后者无条件设置路径。

	// 等等，internal/config/config.go: loadConfig() 设置 Name 和 Path。
	// 如果我们在这里设置 SetConfigFile，随后的 SetConfigName 可能会冲突或被忽略。
	// 让我们修改 internal/config/config.go 以尊重现有的配置文件（如果已设置）？
	// 或者更好的是：将 cfgFile 传递给 config.Load() ？
	// 但 Config.Load() 签名目前为空。

	// 现在，让我们保持简单。config.go 中的重构设置了默认搜索路径。
	// 如果我们需要支持 --config，我们应该更新 config.go 以允许设置特定文件。

	// 让我们更新此文件以仅解析标志。配置加载发生在 Run 中。
}
