package auth

import (
	"sync"

	"github.com/google/uuid"
)

type TokenInfo interface{}

type TokenStore interface {
	// Add adds info to the store, generating and returning the indexing token.
	Add(info TokenInfo) string

	// Get returns the info stored for token and true, otherwise nil and false.
	Get(token string) (info TokenInfo, ok bool)
}

type LocalTokenStore struct {
	rwm sync.RWMutex
	m   map[string]TokenInfo
}

func NewLocalTokenStore() *LocalTokenStore {
	return &LocalTokenStore{
		m: make(map[string]TokenInfo),
	}
}

func (ts *LocalTokenStore) Add(info TokenInfo) string {
	ts.rwm.Lock()
	defer ts.rwm.Unlock()
	token := generateToken()
	ts.m[token] = info
	return token
}

func (ts *LocalTokenStore) Get(token string) (info TokenInfo, ok bool) {
	ts.rwm.RLock()
	defer ts.rwm.RUnlock()
	info, ok = ts.m[token]
	return
}

func generateToken() string {
	return uuid.New().String()
}
