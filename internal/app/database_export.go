package app

import (
	"encoding/json"
	"fmt"
	"os/exec"
	"path"
	"strings"

	"github.com/ncruces/zenity"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type FileType string
type ExportInfo struct {
	FileType FileType `json:"fileType"`
	OutDir   string   `json:"outdir"`
	Filename string   `json:"filename"`
	HostKey  string   `json:"hostKey"`
	DbKey    string   `json:"dbKey"`
	CollKeys []string `json:"collKeys"`
}

const (
	FileTypeJson FileType = "json"
	FileTypeDump FileType = "dump"
	FileTypeCsv  FileType = "csv"
)

func (a *App) PerformExport(jsonData string) bool {
	var info ExportInfo
	err := json.Unmarshal([]byte(jsonData), &info)
	if err != nil {
		runtime.LogError(a.ctx, "Could not unmarshal export form")
		runtime.LogError(a.ctx, err.Error())
		zenity.Info(err.Error(), zenity.Title("Could not parse JSON"), zenity.ErrorIcon)
		return false
	}

	hosts, err := a.Hosts()
	if err != nil {
		zenity.Info(err.Error(), zenity.Title("Error while getting hosts"), zenity.ErrorIcon)
		return false
	}
	host := hosts[info.HostKey]

	switch info.FileType {
	case FileTypeCsv:

	case FileTypeJson:

	case FileTypeDump:
		if !a.Env.HasMongoDump {
			zenity.Info("You need to install mongodump to perform a dump.", zenity.Title("Additional software required"), zenity.ErrorIcon)
			return false
		}

		args := make([]string, 0)
		args = append(args, fmt.Sprintf(`--uri="%v"`, host.URI))

		if info.DbKey != "" {
			args = append(args, fmt.Sprintf(`--db="%v"`, info.DbKey))

			if info.CollKeys != nil {
				args = append(args, fmt.Sprintf(`--collection="%v"`, info.CollKeys[0]))
			}
		}

		args = append(args, fmt.Sprintf(`--out="%v.%v"`, path.Join(info.OutDir, info.Filename), info.FileType))
		cmd := exec.Command("mongodump", args...)
		var stdout strings.Builder
		var stderr strings.Builder
		cmd.Stdout = &stdout
		cmd.Stderr = &stderr
		err = cmd.Run()

		runtime.LogInfo(a.ctx, "Performing dump, executing command: mongodump "+strings.Join(args, " "))
		runtime.LogInfo(a.ctx, "mongodump stdout: "+stdout.String())
		runtime.LogInfo(a.ctx, "mongodump sterr: "+stderr.String())
		if err != nil {
			runtime.LogWarning(a.ctx, "Error while executing mongodump: "+err.Error())
		}

	default:
		zenity.Info(fmt.Sprintf("File type '%v' is not known.", info.FileType), zenity.Title("Unrecognised file type"), zenity.ErrorIcon)
		return false
	}

	return err == nil
}
