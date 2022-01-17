package auth

import (
	"errors"
	"fmt"
	"sync"

	"golang.org/x/crypto/bcrypt"
)

type CredentialStore interface {
	Register(id string, password string) error
	Match(id string, password string) bool
}

type LocalCredentialStore struct {
	rwm sync.RWMutex
	m   map[string][]byte
}

func NewLocalCredentialStore() *LocalCredentialStore {
	return &LocalCredentialStore{
		m: make(map[string][]byte),
	}
}

func (lcs *LocalCredentialStore) Register(id string, password string) error {
	lcs.rwm.Lock()
	defer lcs.rwm.Unlock()
	if _, ok := lcs.m[id]; ok {
		return errors.New("already exists")
	}

	hashedPassword, err := getHash(password)
	if err != nil {
		return fmt.Errorf("generating password hash: %w", err)
	}

	lcs.m[id] = hashedPassword
	return nil
}

func (lcs *LocalCredentialStore) Match(id string, password string) bool {
	if _, ok := lcs.m[id]; !ok {
		return false
	}
	return bcrypt.CompareHashAndPassword(lcs.m[id], []byte(password)) == nil
}

func getHash(pwd string) ([]byte, error) {
	return bcrypt.GenerateFromPassword([]byte(pwd), bcrypt.DefaultCost)
}
