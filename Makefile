build:
	docker compose up -d --build
up:
	docker compose up -d && yarn dev
down:
	docker compose down
list:
	docker ps 