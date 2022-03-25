package auth

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestLocalCredentialStore(t *testing.T) {
	// ensure it implements interface
	var _ CredentialStore = NewLocalCredentialStore()

	t.Run("EmptyStore", func(t *testing.T) {
		rq := require.New(t)
		cs := NewLocalCredentialStore()
		rq.False(cs.Match("foo", "bar"))
		rq.False(cs.Match("foo", ""))
		rq.False(cs.Match("foo", "#$%ˆ&*("))
	})

	t.Run("AlreadyExists", func(t *testing.T) {
		rq := require.New(t)
		cs := NewLocalCredentialStore()
		id := "id"
		rq.NoError(cs.Register(id, "foobar"))
		rq.Error(cs.Register(id, "foobar"))
	})

	t.Run("MultipleUsers", func(t *testing.T) {
		rq := require.New(t)
		cs := NewLocalCredentialStore()
		id := "id"
		rq.NoError(cs.Register(id, "foobar"))
		rq.True(cs.Match(id, "foobar"))
		rq.False(cs.Match(id, "foobaz"))

		id2 := "id2"
		rq.NoError(cs.Register(id2, "foobaz"))
		rq.True(cs.Match(id2, "foobaz"))
		rq.False(cs.Match(id2, "foobar"))
	})

}
