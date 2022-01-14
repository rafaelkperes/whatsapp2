package main

import (
	"fmt"
	"net/http"
)

const (
	port = "8080"
)

func main() {
	http.HandleFunc("/", func(rw http.ResponseWriter, r *http.Request) {
		rw.WriteHeader(http.StatusServiceUnavailable)
		rw.Write([]byte("under development"))
	})
	http.ListenAndServe(fmt.Sprintf(":%s", port), nil)
}
