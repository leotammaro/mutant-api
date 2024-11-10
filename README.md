## Prerequisites:

- Node 18+
- Docker desktop

## Initialization

As a first step `npm install` to install all necessary dependencies

As a second step, create a `.env` file and add the environment variables found in the `.env.dist` example, this will allow the server to connect to the database container.

As a third step, once the server is running, we must run the database migrations.
For this we will run the script `npm run migration:run` which will run the migrations that it has in the folder `/data/migrations`.

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
