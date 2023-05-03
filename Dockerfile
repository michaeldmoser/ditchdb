FROM mcr.microsoft.com/devcontainers/python:3.11-bullseye

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


RUN apt-get update && apt-get install -y \
    curl \
    git \
    gnupg2 \
    make \
    zsh && \
    rm -rf /var/lib/apt/lists/*

RUN chsh -s /bin/zsh vscode

RUN curl -fsSL https://deb.nodesource.com/setup_19.x | bash - && \
  apt-get install -y nodejs
RUN npm install -g pnpm 

RUN set -ex && \
    pip install --upgrade pip && \
    pip install "poetry==1.4.0"
