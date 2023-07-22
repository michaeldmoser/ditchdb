FROM debian:bookworm-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV QT_QPA_PLATFORM offscreen

RUN apt-get update && \
    apt-get install -y \
        python3-full \
        python3-qgis \
        python3-pip \
        python3-django \
        python3-psycopg \
        python3-dotenv && \
    apt-get clean
