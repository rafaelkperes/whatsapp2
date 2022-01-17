package routes

import (
	"encoding/json"
	"log"
	"net/http"
)

type errorMessage struct {
	Code    int    `json:"-"`
	Message string `json:"message"`
}

func newErrorMessage(code int, message string) errorMessage {
	return errorMessage{
		Code:    code,
		Message: message,
	}
}

func (e errorMessage) Write(w http.ResponseWriter) {
	w.WriteHeader(e.Code)
	if err := json.NewEncoder(w).Encode(e); err != nil {
		log.Printf("Error writing response body: %s", err)
	}
}
