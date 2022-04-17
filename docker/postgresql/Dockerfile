FROM postgres:13

WORKDIR /app

COPY ./init.sh /docker-entrypoint-initdb.d
COPY ./dump.sql ./dump.sql
