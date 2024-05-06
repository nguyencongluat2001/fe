.DEFAULT_GOAL := up

# --------------------- DOCKER COMPOSE -------------------
up:
	docker-compose up -d

down:
	docker-compose down

start:
	docker-compose start

stop:
	docker-compose stop

# --------------------- APP -------------------

npm-install:
	docker-compose exec angular npm install -g @angular/cli && docker-compose exec angular npm install --legacy-peer-deps

npm-start:
	docker-compose exec angular npm start

npm-serve:
	docker-compose exec angular npm run serve

permision:
	sudo chmod 777 storage/logs/* && sudo chmod 777 storage/framework/* && sudo chmod 777 storage/framework/cache/*

npm-build:
	docker-compose exec angular npm run build