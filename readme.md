## Application

This is typescript nodejs app, it uses fastify as webserver.

## Components

1 Internal socket server: This server will emit data as encrypted piped stream.
2 Internal socket client: This client listens to data, decrypts and saves it to Database.
3 Emit server: This server will emit decrypted data to frontend clients
4 Simple frontend: This is one html file which has webscocket client

## System Requirements

1 Node v16 LTS
2 MongoDB version 5

## Installation

```bash
$ npm install
```

## Usage

To run the app:

```bash
$ npm start
```

To run in dev mod:

```bash
$ npm run dev
```

## How to Use

Ater starting app, open url: http://localhost:3000/listen?count=5&delay=5
Define count to get number of records in one stream
Define delay to wait before next stream (seconds)

## Library information

This app is built using fastify, fastify plugings, mongoose, ws websocket client and server and ejs template
