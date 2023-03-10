postgres:
	docker run --name postgres12 -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:12-alpine

createdb:
	docker exec -it postgres12 createdb --username=root --owner=root approval_events 

dropdb:
	docker exec -it postgres12 dropdb approval_events 

shell:
	docker exec -it postgres12 /bin/sh

psql-shell:
	docker exec -it postgres12 psql -U root

# sqlc: 
# 	sqlc generate

# test:
# 	go test -v -cover ./...

.PHONY: postgres createdb dropdb shell