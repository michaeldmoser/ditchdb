FROM python:3.11-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


RUN apt-get update && apt-get install -y \
    curl \
    git \
    gnupg2 \
    make \
    less \
    neovim \
    zsh \
    libpq5 && \
    rm -rf /var/lib/apt/lists/*


RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.5/zsh-in-docker.sh)" -- \
    -p git -p ssh-agent -p 'history-substring-search' \
    -a 'bindkey "\$terminfo[kcuu1]" history-substring-search-up' \
    -a 'bindkey "\$terminfo[kcud1]" history-substring-search-down'
  
RUN chsh -s /bin/zsh

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
  apt-get install -y nodejs

RUN set -ex && \
    pip install --upgrade pip && \
    pip install "poetry==1.5.0"
RUN poetry config virtualenvs.create false
