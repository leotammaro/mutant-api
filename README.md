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

## Endpoints and modules

`Mutant module`

`http://localhost:${PORT}/mutant`

```
@Post

request: {
  body: {
    dna: string[]
}
}

```

`Dna module`

`http://localhost:${PORT}/dna/stats`

```
@Get

response: {
  mutants_count: number,
  humans_count:number
  ratio: number
}


```
