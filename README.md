# load-testing-with-artillery.io
1. run `export PGPASSWORD='password'; pg_dump -U postgres -d verinote-localdev -f db.sql`
1. create new database `export PGPASSWORD='password'; psql -U postgres -c "CREATE DATABASE verinoteloadtest"`
1. restore `psql -U postgres -d verinoteloadtest -f localdev.sql`
1. drop `psql -U postgres -c "DROP DATABASE verinoteloadtest"`