## Prerequisites:

- Node 18+
- Docker desktop

## Initialization

- Run database container using `docker-compose up -d` or `docker compose up -d` depending on your operating system

- `npm install` to install all necessary dependencies

- Create `.env` and copy `.env.dist`

For this we will run the script `npm run migration:run` which will run the migrations that it has in the folder `/data/migrations`.
This script will generate the `mutant` and `dna` tables.

- `npm run start:dev`

## Tests

- `npm run test`
- `npm run test:cov` to show coverage of code.

## Deploy

https://mutant-api-seven.vercel.app/

## Swagger

To view the documentation, check the `/api` endpoint.

https://mutant-api-seven.vercel.app/api

It describes the different routes and examples of responses.
