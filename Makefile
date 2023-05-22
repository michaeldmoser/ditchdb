
all: setup

setup: setup-frontend setup-python-stack 

setup-frontend: frontend/node_modules

frontend/node_modules: frontend/package.json frontend/pnpm-lock.yaml
	cd frontend && pnpm install

setup-python-stack: .python.installed .playwright.installed

.python.installed: pyproject.toml poetry.lock
	poetry install	
	touch .python.installed

.playwright.installed: .python.installed
	playwright install
	touch .playwright.installed

dev: setup frontend/dist
	bin/dev

frontend/dist:
	cd frontend && pnpm build

test-full: test-e2e

test-e2e: setup-python-stack
	bin/e2e-test run

clean:
	poetry env remove --all
	poetry cache clear --all -q _default_cache
	poetry cache clear --all -q PyPI
	rm .python.installed
	find . -type f -name *.pyc -delete
	find . -type d -name __pycache__ -delete
	rm -rf e2e/node_modules
	rm -rf frontend/node_modules

.PHONY: cypress dev test-e2e test-full