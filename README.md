# load-testing-with-artillery.io
1. run `npm install`
1. create `.env` file and populate with the following information

```bash
PGUSER=postgres
PGHOST=localhost
PGPASSWORD=password
PGDATABASE=dbname
PGPORT=5432
```
1. update init.sh with all command which will create a blank database for load testing
1. update `config.yml` accordingly
1. run `node .` to seed the db
1. run `artillery run config.yml` to run the load test