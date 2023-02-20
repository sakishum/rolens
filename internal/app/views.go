package app

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"os"
	"path"

	"github.com/ncruces/zenity"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type ViewType string
type InputType string

const (
	TableView ViewType = "table"
	ListView  ViewType = "list"

	NoInput       InputType = "none"
	StringInput   InputType = "string"
	ObjectIdInput InputType = "objectid"
	IntegerInput  InputType = "int"
	LongInput     InputType = "long"
	Uint64Input   InputType = "uint64"
	DoubleInput   InputType = "double"
	DecimalInput  InputType = "decimal"
	BoolInput     InputType = "bool"
	DateInput     InputType = "date"
)

type ViewColumn struct {
	Key         string    `json:"key"`
	Width       int64     `json:"width"`
	ShowInTable bool      `json:"showInTable"`
	Mandatory   bool      `json:"mandatory"`
	InputType   InputType `json:"inputType"`
}

type View struct {
	Name                 string       `json:"name"`
	Host                 string       `json:"host"`
	Database             string       `json:"database"`
	Collection           string       `json:"collection"`
	Type                 ViewType     `json:"type"`
	HideObjectIndicators bool         `json:"hideObjectIndicators"`
	Columns              []ViewColumn `json:"columns"`
}

var BuiltInListView = View{
	Name: "List",
	Type: ListView,
}

type ViewStore map[string]View

func updateViewStore(a *App, newData ViewStore) error {
	newData["list"] = BuiltInListView
	filePath := path.Join(a.Env.DataDirectory, "views.json")

	jsonData, err := json.MarshalIndent(newData, "", "\t")
	if err != nil {
		return err
	}

	err = ioutil.WriteFile(filePath, jsonData, os.ModePerm)
	return err
}

func (a *App) Views() (ViewStore, error) {
	views := make(ViewStore, 0)
	filePath := path.Join(a.Env.DataDirectory, "views.json")

	jsonData, err := ioutil.ReadFile(filePath)
	views["list"] = BuiltInListView
	if err != nil {
		// It's ok if the file cannot be opened, for example if it is not accessible.
		// Therefore no error is returned.
		runtime.LogInfo(a.ctx, "views.json file cannot be opened")
		runtime.LogInfo(a.ctx, err.Error())
		return views, nil
	}

	if len(jsonData) > 0 {
		err = json.Unmarshal(jsonData, &views)
		if err != nil {
			runtime.LogInfo(a.ctx, "views.json file contains malformatted JSON data")
			runtime.LogInfo(a.ctx, err.Error())
			return views, errors.New("views.json file contains malformatted JSON data")
		}
	}

	return views, nil
}

func (a *App) UpdateViewStore(jsonData string) error {
	runtime.LogDebug(a.ctx, "Updating view store. New data:")
	runtime.LogDebug(a.ctx, jsonData)

	var viewStore ViewStore
	err := json.Unmarshal([]byte(jsonData), &viewStore)
	if err != nil {
		zenity.Info(err.Error(), zenity.Title("Could not parse JSON"), zenity.ErrorIcon)
		return errors.New("invalid JSON")
	}

	err = updateViewStore(a, viewStore)
	if err != nil {
		zenity.Info(err.Error(), zenity.Title("Error while updating view store"), zenity.ErrorIcon)
		return errors.New("could not update view store")
	}

	return nil
}

func (a *App) RemoveView(viewKey string) error {
	views, err := a.Views()
	if err != nil {
		zenity.Info(err.Error(), zenity.Title("Error while getting views"), zenity.ErrorIcon)
		return errors.New("could not retrieve existing view store")
	}

	err = zenity.Question("Are you sure you want to remove "+views[viewKey].Name+"?", zenity.Title("Confirm"), zenity.WarningIcon)
	if err == zenity.ErrCanceled {
		return errors.New("operation aborted")
	}

	delete(views, viewKey)
	err = updateViewStore(a, views)

	if err != nil {
		zenity.Info(err.Error(), zenity.Title("Error while updating view store"), zenity.ErrorIcon)
		return errors.New("could not update view store")
	}
	return nil
}
