export PGPASSWORD='password'
psql -U postgres -c "DROP DATABASE verinoteloadtest"
pg_dump -U postgres -d verinote-localdev -f db.sql
psql -U postgres -c "CREATE DATABASE verinoteloadtest"
psql -U postgres -d verinoteloadtest -f db.sql