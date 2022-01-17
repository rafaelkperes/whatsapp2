package routes

import (
	"encoding/json"
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
		newErrorMessage(http.StatusBadRequest, err.Error()).Write(rw)
		return
	}

	if !r.creds.Match(reqBody.Username, reqBody.Password) {
		newErrorMessage(http.StatusBadRequest, "invalid username or password").Write(rw)
		return
	}

	// TODO: change TokenStore so that the stored interface support retrieving the username.
	token := r.tokens.Add(reqBody.Username)
	respBody.Token = token
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(respBody)
}

func (r *authRouter) handleRegister(rw http.ResponseWriter, rq *http.Request) {
	var reqBody struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(rq.Body).Decode(&reqBody); err != nil {
		newErrorMessage(http.StatusBadRequest, err.Error()).Write(rw)
		return
	}

	if err := r.creds.Register(reqBody.Username, reqBody.Password); err != nil {
		newErrorMessage(http.StatusInternalServerError, err.Error()).Write(rw)
		return
	}

	rw.WriteHeader(http.StatusCreated)
}
