ARG PYTHON_VERSION=3.11-slim-buster

FROM python:${PYTHON_VERSION}

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir -p /code

WORKDIR /code

COPY requirements.txt /tmp/requirements.txt

RUN set -ex && \
    pip install --upgrade pip && \
    pip install "poetry==1.4.0"

RUN apt-get update && apt-get install -y curl

RUN curl -fsSL https://deb.nodesource.com/setup_19.x | bash - && \
  apt-get install -y nodejs
RUN npm install -g pnpm

COPY . /code/
RUN poetry config virtualenvs.create false \
  && poetry install "--no-dev" --no-interaction --no-ansi
# && poetry install $(test "$YOUR_ENV" == production && echo "--no-dev") --no-interaction --no-ansi

RUN cd frontend && pnpm install
RUN cd frontend && pnpm build

WORKDIR /code/backend
RUN python manage.py collectstatic --noinput

EXPOSE 8000

# replace demo.wsgi with <project_name>.wsgi
CMD ["gunicorn", "--bind", ":8000", "--workers", "2", "backend.wsgi"]
