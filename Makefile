current_dir = $(shell pwd)

all: setup

setup: .env setup-frontend install.python 

setup-frontend: node_modules frontend.models

node_modules: package.json
	npm install

install.python: /tmp/python.installed
/tmp/python.installed: pyproject.toml poetry.lock
	poetry install	
	touch /tmp/python.installed

install.playwright: install.python /tmp/playwright.installed
/tmp/playwright.installed:
	playwright install --with-deps
	touch /tmp/playwright.installed

frontend.models: frontend/src/types/ditchdb/index.d.ts
frontend/src/types/ditchdb/index.d.ts: backend/ditchdb/models.py
	cd backend && python ./manage.py generate_ts --all -t -o ../frontend/src/types/
	cd frontend/src/types/ditchdb && sed -e 's/^export //' index.ts > index.d.ts
	rm frontend/src/types/ditchdb/index.ts

.env:
	cp .env.example .env
	@PASSWORD=$$(openssl rand -base64 32 | tr -d /=+ | cut -c -32) ; \
    echo "SQL_SERVER_PASSWORD=$$PASSWORD" >> .env ; \
    echo "DB_PASSWORD=$$PASSWORD" >> .env ; \
	echo >> .env ;

testing/e2e/.env: .env
	cat .env | sed -e "s/ditchdb_dev/ditchdb_e2e/g" > $@
	echo "VITE_DEV_PORT=5175" >> $@
	echo "DJANGO_PORT=5174" >> $@

frontend/src/testing/.env: .env
	mkdir -p frontend/testing
	cat .env | sed -e "s/ditchdb_dev/ditchdb_test/g" > $@
	echo "VITE_DEV_PORT=5177" >> $@
	echo "DJANGO_PORT=5176" >> $@

frontend/dist:
	npm run build

.PHONY: test.full
test.full: test.e2e

.PHONY: test.e2e
test.e2e: install.playwright 
	pytest testing/e2e

.PHONY: test.fe 
test.fe: setup-frontend frontend/src/testing/.env
	bin/start-fe-tests

.PHONY: clean
clean:
	poetry env remove --all
	poetry cache clear --all -q _default_cache
	poetry cache clear --all -q PyPI
	-rm -f /tmp/python.installed
	-rm -f /tmp/playwright.installed
	find . -type f -name *.pyc -delete
	find . -type d -name __pycache__ -delete
	-rm -rf e2e/node_modules
	-rm -rf node_modules

## Development
.PHONY: migrate
migrate: install.python
	cd backend && python ./manage.py migrate
	cd backend && DJANGO_ENV=$(current_dir)/frontend/src/testing/.env python  ./manage.py migrate

.PHONY: serve.dev
serve.dev: setup frontend/dist
	bin/start-dev-server

.PHONY: serve.e2e
serve.e2e: setup 
	bin/start-e2e-server

.PHONY: serve.storybook
serve.storybook: setup-frontend
	npm run storybook

.PHONY: import.orion
import.orion: 
	docker compose run import-orion

.PHONY: mark.indistrict
mark.indistrict: 
	docker compose run qgis

.PHONY: makemigrations
makemigrations: install.python
	cd backend && python ./manage.py makemigrations

.PHONY: reset
reset: 
	docker compose exec dev bash -c 'cd backend && python3 ./manage.py flush --noinput && python3 ./manage.py migrate'

.PHONY: data.reset
data.reset: reset import.orion mark.indistrict

