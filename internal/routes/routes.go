package routes

import (
	"net/http"

	"github.com/gorilla/mux"
)

func CreateHandler() (http.Handler, error) {
	h := &handler{
		Router: mux.NewRouter(),
	}
	h.RegisterAuth()
	return h, nil
}

type handler struct {
	*mux.Router
}

func (h *handler) RegisterAuth() {
	r := h.PathPrefix("/auth").Subrouter()
	r.HandleFunc("/login", handleLogin).
		Methods(http.MethodPost)
	r.HandleFunc("/register", nil).
		Methods(http.MethodPut)
}
