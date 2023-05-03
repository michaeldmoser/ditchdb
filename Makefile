
all: setup

setup: setup-frontend setup-backend setup-e2e

setup-frontend: frontend/node_modules

frontend/node_modules: frontend/package.json frontend/pnpm-lock.yaml
	cd frontend && pnpm install

setup-backend: .backend-setup

.backend-setup: pyproject.toml poetry.lock
	poetry install
	touch .backend-setup

poetry.lock:
	poetry install

setup-e2e: e2e/node_modules 

e2e/node_modules: e2e/package.json e2e/pnpm-lock.yaml
	cd e2e && pnpm install
	cd e2e && pnpx playwright install --with-deps


e2e/pnpm-lock.yaml:
	cd e2e && pnpm install

dev: setup frontend/dist
	poetry run bin/dev

frontend/dist:
	cd frontend && pnpm build

test-full: test-e2e

test-e2e: setup
	poetry run bin/e2e-test run

cypress:
	poetry run bin/e2e-test open

clean:
	rm .backend-setup
	find . -type f -name *.pyc -delete
	find . -type d -name __pycache__ -delete
	rm -rf e2e/node_modules
	rm -rf frontend/node_modules

.PHONY: cypress dev test-e2e test-full