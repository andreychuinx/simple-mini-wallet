# SIMPLE MINI WALLET

## Conventions

## Development

Prerequisite

-   VSCode
-   Installed Docker
-   Node LTS
-   docker-compose newer than version 1.17.3

### Start development environment

-   Create `.env` file or run `cp .env.example .env`

You can look for the example in the `.env.example`

Next up you can choose to run your development environment entirely inside Docker or to run the app server directly on your local machine.

#### Running app server directly on your local machine's environment

-   Start the db service in Docker

```bash
docker-compose up -d postgres
```

-   Start your app server

```bash
docker-compose up -d web
```

-   Shutdown development cluster

```bash
docker-compose down
```