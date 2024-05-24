build:
	docker compose up -d --build
up:
	docker compose up -d && docker logs -f server-backend-1
down:
	docker compose down
list:
	docker ps -a
restart:
	docker compose down && docker compose up -d && docker logs -f server-backend-1
logs:
	docker logs server-backend-1
rebuild:
	docker compose down && docker compose up -d --build && docker logs -f server-backend-1