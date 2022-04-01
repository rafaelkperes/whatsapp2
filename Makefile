TARGET_DIR=bin

all: build test 

build:
	CGO_ENABLED=0 go build -o ${TARGET_DIR}/server ./cmd/server
 
run: build
	./bin/server

test:
	CGO_ENABLED=0 go test ./...
	CGO_ENABLED=0 go test -race ./...

lint:
	golangci-lint run

clean:
	go clean
	rm -rf ${TARGET_DIR}