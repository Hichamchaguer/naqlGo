#!/bin/sh

# # Install dependencies if node_modules is empty
# if [ ! -d "node_modules" ] || [ -z "$(ls -A node_modules)" ]; then
#   echo "Installing dependencies..."
#   yarn install
# fi

set -e

host="${DB_HOST:-mongoDB}"
port="${DB_PORT:-27017}"

until nc -z "$host" "$port"; do
  >&2 echo "MongoDB is unavailable - sleeping"
  sleep 1
done

>&2 echo "MongoDB is up - executing command"

# Start your app
npm start