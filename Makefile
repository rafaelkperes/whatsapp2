TARGET_DIR=bin

all: build test 

build:
	go build -o ${TARGET_DIR}/server ./cmd/server
 
run: build
	./bin/server

test:
	go test ./...
	go test -race ./...

lint:
	golangci-lint run

clean:
	go clean
	rm -rf ${TARGET_DIR}