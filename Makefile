
all: setup

setup: setup-frontend install.python 

setup-frontend: frontend/node_modules frontend.models

frontend/node_modules: frontend/package.json frontend/pnpm-lock.yaml
	cd frontend && pnpm install

install.python: /tmp/python.installed
/tmp/python.installed: pyproject.toml poetry.lock
	poetry install	
	touch /tmp/python.installed

install.playwright: install.python /tmp/playwright.installed
/tmp/playwright.installed:
	playwright install --with-deps
	touch /tmp/playwright.installed

frontend.models: frontend/src/types/ditchdb/index.d.ts
frontend/src/types/ditchdb/index.d.ts:
	cd backend && python ./manage.py generate_ts --all -t -o ../frontend/src/types/
	mv frontend/src/types/ditchdb/index.ts frontend/src/types/ditchdb/index.d.ts

.PHONY: serve.dev
serve.dev: setup frontend/dist
	bin/dev

.PHONY: serve.e2e
serve.e2e: setup 
	bin/e2e

.PHONY: serve.storybook
serve.storybook: setup-frontend
	cd frontend && pnpm run storybook

frontend/dist:
	cd frontend && pnpm build

.PHONY: test-full
test-full: test-e2e

.PHONY: test-e2e
test-e2e: install.playwright 
	cd testing/e2e && pytest

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
	-rm -rf frontend/node_modules
