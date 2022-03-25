package routes

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/rafaelkperes/whatsapp2/internal/auth"
)

type authRouter struct {
	creds  auth.CredentialStore
	tokens auth.TokenStore
}

func newAuthRouter(creds auth.CredentialStore, tokens auth.TokenStore) *authRouter {
	return &authRouter{
		creds:  creds,
		tokens: tokens,
	}
}

func (r *authRouter) handleLogin(rw http.ResponseWriter, rq *http.Request) {
	var reqBody struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	var respBody struct {
		Token string `json:"token"`
	}

	if err := json.NewDecoder(rq.Body).Decode(&reqBody); err != nil {
		writeResponseError(rw, http.StatusBadRequest, err.Error())
		return
	}

	if !r.creds.Match(reqBody.Username, reqBody.Password) {
		writeResponseError(rw, http.StatusBadRequest, "invalid username or password")
		return
	}

	// TODO: change TokenStore so that the stored interface support retrieving the username.
	token := r.tokens.Add(reqBody.Username)
	respBody.Token = token
	rw.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(rw).Encode(respBody); err != nil {
		log.Printf("Error writing response body: %s", err)
	}
}

func (r *authRouter) handleRegister(rw http.ResponseWriter, rq *http.Request) {
	var reqBody struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(rq.Body).Decode(&reqBody); err != nil {
		writeResponseError(rw, http.StatusBadRequest, err.Error())
		return
	}

	if err := r.creds.Register(reqBody.Username, reqBody.Password); err != nil {
		writeResponseError(rw, http.StatusInternalServerError, err.Error())
		return
	}

	rw.WriteHeader(http.StatusCreated)
}
