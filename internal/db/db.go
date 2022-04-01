package db

import (
	"io"
	"time"
)

type DB interface {
	Users() Users
	Tokens() Tokens
	io.Closer
}

type Users interface {
	Create(id string, password []byte) error
	Password(id string) ([]byte, error)
	All() ([]string, error)
}

type Token string

type TokenInfo struct {
	ID      string
	Created time.Time
}

type Tokens interface {
	New(TokenInfo) (Token, error)
	Get(Token) (TokenInfo, error)
	// TODO: how to invalidate?
}
