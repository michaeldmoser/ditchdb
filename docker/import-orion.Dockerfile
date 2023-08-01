FROM mcr.microsoft.com/mssql/server:2022-latest

USER root
RUN  apt-get update \
    && apt-get install -y postgresql-client zip unzip \
    && apt-get clean
ENV PATH=/opt/mssql-tools/bin:$PATH
USER mssql
EXPOSE 1433

