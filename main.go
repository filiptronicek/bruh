package main

import (
	"fmt"
	"github.com/spf13/cobra"
	"net"
	"time"
)

var rootCmd = &cobra.Command{
	Use:   "bruh",
	Short: "The Broadband Response and Uptime Heuristic checks your internet connectivity.",
	Run:   runCheck,
}

var timeoutFlag int

func init() {
	// Register a --timeout flag to configure the timeout for the connectivity check.
	rootCmd.PersistentFlags().IntVarP(&timeoutFlag, "timeout", "t", 2, "Timeout in seconds for each connectivity check")
}

func runCheck(cmd *cobra.Command, args []string) {
	timeout := time.Duration(timeoutFlag) * time.Second

	// Attempt to connect to 1.1.1.1 with the specified timeout.
	if tryConnect("1.1.1.1", timeout) {
		fmt.Println("✅ you are online")
		return
	}

	// If the first attempt fails, try connecting to 8.8.8.8.
	if tryConnect("8.8.8.8", timeout) {
		fmt.Println("✅ you are online")
	} else {
		fmt.Println("❌ you are offline")
	}
}

// tryConnect attempts to establish a TCP connection to the given address and port.
func tryConnect(address string, timeout time.Duration) bool {
	conn, err := net.DialTimeout("tcp", net.JoinHostPort(address, "53"), timeout)
	if err != nil {
		return false
	}
	conn.Close()
	return true
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
	}
}
