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
	if err := json.NewEncoder(w).Encode(e); err != nil {
		log.Printf("Error writing response body: %s", err)
	}
}
