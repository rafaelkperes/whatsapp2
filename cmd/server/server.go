package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/rafaelkperes/whatsapp2/internal/routes"
)

const (
	iface = "localhost"
	port  = "8080"
)

func main() {
	http.Handle("/", routes.CreateHandler())

	if err := http.ListenAndServe(fmt.Sprintf("%s:%s", iface, port), nil); err != nil {
		log.Fatal(err)
	}
}
