package db

import (
	"context"
	"errors"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func Mongo(host string, port int) (DB, error) {
	ctx := context.Background()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(fmt.Sprintf("mongodb://%s:%d", host, port)))
	if err != nil {
		return nil, err
	}
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		return nil, fmt.Errorf("could not validate mongo connection: %w", err)
	}

	return &mongodb{
		client: client,
	}, nil
}

type mongodb struct {
	client *mongo.Client
}

func (m *mongodb) Close() error {
	return nil
}

func (m *mongodb) Users() Users {
	return m
}

func (m *mongodb) Tokens() Tokens {
	return m
}

func (m *mongodb) Create(id string, password []byte) error {
	collection := m.client.Database("testing").Collection("numbers")
	entry := bson.D{{"id", id}, {"password", password}}
	_, err := collection.InsertOne(context.Background(), entry)
	return err
}

func (m *mongodb) Password(id string) ([]byte, error) {
	return nil, errors.New("NOT IMPLEMENTED")
}

func (m *mongodb) All() ([]string, error) {
	return nil, errors.New("NOT IMPLEMENTED")
}

func (m *mongodb) New(TokenInfo) (Token, error) {
	return "", errors.New("NOT IMPLEMENTED")
}

func (m *mongodb) Get(Token) (TokenInfo, error) {
	return TokenInfo{}, errors.New("NOT IMPLEMENTED")
}
