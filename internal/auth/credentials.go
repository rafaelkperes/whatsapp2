package auth

import (
	"errors"
	"fmt"
	"sync"

	"golang.org/x/crypto/bcrypt"
)

type UserID string

type CredentialStore interface {
	Register(id UserID, password string) error
	Match(id UserID, password string) bool
}

type LocalCredentialStore struct {
	rwm sync.RWMutex
	m   map[UserID][]byte
}

func NewLocalCredentialStore() *LocalCredentialStore {
	return &LocalCredentialStore{
		m: make(map[UserID][]byte),
	}
}

func (lcs *LocalCredentialStore) Register(id UserID, password string) error {
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

func (lcs *LocalCredentialStore) Match(id UserID, password string) bool {
	return bcrypt.CompareHashAndPassword(lcs.m[id], []byte(password)) == nil
}

func getHash(pwd string) ([]byte, error) {
	return bcrypt.GenerateFromPassword([]byte(pwd), bcrypt.DefaultCost)
}
