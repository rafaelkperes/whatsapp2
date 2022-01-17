package routes

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rafaelkperes/whatsapp2/internal/auth"
)

func CreateHandler() http.Handler {
	h := &handler{
		Router:     mux.NewRouter().PathPrefix("/api/v1").Subrouter(),
		authRouter: newAuthRouter(auth.NewLocalCredentialStore(), auth.NewLocalTokenStore()),
	}

	r := h.PathPrefix("/auth").Subrouter()
	r.HandleFunc("/login", h.authRouter.handleLogin).
		Methods(http.MethodPost)
	r.HandleFunc("/register", h.authRouter.handleRegister).
		Methods(http.MethodPost)
	return h
}

type handler struct {
	*mux.Router

	authRouter *authRouter
}
