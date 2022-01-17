package main

import (
	"fmt"
	"log"
	"net/http"
)

const (
	iface = "localhost"
	port  = "8080"
)

func main() {
	http.HandleFunc("/", func(rw http.ResponseWriter, r *http.Request) {
		rw.WriteHeader(http.StatusServiceUnavailable)
		_, err := rw.Write([]byte("under development"))
		if err != nil {
			log.Printf("Error writing response body: %s", err)
		}
	})
	if err := http.ListenAndServe(fmt.Sprintf("%s:%s", iface, port), nil); err != nil {
		log.Fatal(err)
	}
}
