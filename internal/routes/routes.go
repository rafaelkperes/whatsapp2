package routes

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rafaelkperes/whatsapp2/internal/auth"
)

func CreateHandler() http.Handler {
	credStore := auth.NewLocalCredentialStore()
	tokenStore := auth.NewLocalTokenStore()

	h := &handler{
		Router:     mux.NewRouter().PathPrefix("/api/v1").Subrouter(),
		authRouter: newAuthRouter(credStore, tokenStore),
	}

	r := h.PathPrefix("/auth").Subrouter()
	r.HandleFunc("/login", h.authRouter.handleLogin).
		Methods(http.MethodPost)
	r.HandleFunc("/register", h.authRouter.handleRegister).
		Methods(http.MethodPost)

	/// Example usage of the session wrapper:
	// Remove the helloHandler (and the '/hello' route once we have actual endpoints that require auth)
	swf := newSessionWrapperFactory(tokenStore)
	helloHandler := func(rw http.ResponseWriter, rq *http.Request) {
		token := TokenInfoFromContext(rq.Context()).(string)
		logWriteSizeError(rw.Write([]byte(fmt.Sprintf("Hello, %s!", token))))
	}
	h.Handle("/hello", swf.SessionWrapperFunc(helloHandler))

	return h
}

type handler struct {
	*mux.Router

	authRouter *authRouter
}
