package auth

import (
	"sync"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestLocalTokenStore(t *testing.T) {
	rq := require.New(t)

	lts := NewLocalTokenStore()

	// ensure it implements the required interface
	var ts TokenStore = lts

	info, ok := ts.Get("new-token")
	rq.False(ok)
	rq.Nil(info)

	myInfo := struct{}{}
	myToken := ts.Add(myInfo)
	info, ok = ts.Get(myToken)
	rq.True(ok)
	rq.Equal(myInfo, info)

	// add some field to differentiate
	myInfo2 := struct{ a string }{a: ""}
	myToken2 := ts.Add(myInfo2)

	// check both tokens after adding 2nd
	info, ok = ts.Get(myToken)
	rq.True(ok)
	rq.Exactly(myInfo, info)
	info2, ok := ts.Get(myToken2)
	rq.True(ok)
	rq.Exactly(myInfo2, info2)
	rq.NotEqual(myInfo, myInfo2)
}

// TestLocalTokenStoreConcurrentAccess should be run with the race flag to detect data races.
func TestLocalTokenStoreConcurrentAccess(t *testing.T) {
	const (
		totalInfos = 1e4 // 10K
	)

	type Info struct{ a int }

	infos := make([]Info, totalInfos)
	for i := 0; i < totalInfos; i++ {
		infos[i] = Info{i}
	}

	lts := NewLocalTokenStore()
	wg := sync.WaitGroup{}
	wg.Add(10)

	// start reading thread to trigger concurrent reads & writes
	done := make(chan struct{}, 1)
	go func() {
		for {
			select {
			case <-done:
				return
			default:
			}
			_, ok := lts.Get(generateToken())
			require.False(t, ok)
		}
	}()

	// start writers
	for i := 0; i < 10; i++ {
		i := i
		go func() {
			for j := 0; j < totalInfos/10; j++ {
				idx := i*(totalInfos/10) + j
				lts.Add(infos[idx])
			}
			wg.Done()
		}()
	}
	wg.Wait()
	// kill reading thread
	close(done)

	require.Equal(t, len(infos), len(lts.m))
	storedInfos := make([]Info, 0, len(lts.m))
	for _, info := range lts.m {
		storedInfos = append(storedInfos, info.(Info))
	}
	require.ElementsMatch(t, infos, storedInfos)
}
