package routes

import (
	"context"
	"net/http"

	"github.com/rafaelkperes/whatsapp2/internal/auth"
)

var (
	sessionContextKey = struct{}{}
)

func TokenInfoFromContext(ctx context.Context) auth.TokenInfo {
	return ctx.Value(sessionContextKey).(auth.TokenInfo)
}

type sessionWrapperFactory struct {
	tokenStore auth.TokenStore
}

func newSessionWrapperFactory(ts auth.TokenStore) *sessionWrapperFactory {
	return &sessionWrapperFactory{
		tokenStore: ts,
	}
}

func (swf *sessionWrapperFactory) SessionWrapper(h http.Handler) http.Handler {
	return sessionWrapper{
		tokenStore: swf.tokenStore,
		h:          h,
	}
}

func (swf *sessionWrapperFactory) SessionWrapperFunc(h http.HandlerFunc) http.Handler {
	return sessionWrapper{
		tokenStore: swf.tokenStore,
		h:          h,
	}
}

type sessionWrapper struct {
	tokenStore auth.TokenStore
	h          http.Handler
}

func (sw sessionWrapper) ServeHTTP(rw http.ResponseWriter, rq *http.Request) {
	c, err := rq.Cookie("session")
	if err != nil {
		writeResponseError(rw, http.StatusUnauthorized, "missing session token")
		return
	}
	tokenInfo, ok := sw.tokenStore.Get(c.Value)
	if !ok {
		writeResponseError(rw, http.StatusUnauthorized, "invalid session token")
		return
	}
	rq = rq.WithContext(context.WithValue(rq.Context(), sessionContextKey, tokenInfo))
	sw.h.ServeHTTP(rw, rq)
}
