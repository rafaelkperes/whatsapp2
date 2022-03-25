package routes

import (
	"encoding/json"
	"log"
	"net/http"
)

func writeResponseError(w http.ResponseWriter, code int, message string) {
	w.WriteHeader(code)

	e := struct {
		Code    int    `json:"code"`
		Message string `json:"message"`
	}{
		Code:    code,
		Message: message,
	}
	logWriteError(json.NewEncoder(w).Encode(e))
}

func logWriteSizeError(_ int, err error) {
	logWriteError(err)
}

func logWriteError(err error) {
	if err != nil {
		log.Printf("Error writing response body: %s", err)
	}
}
