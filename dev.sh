#!/bin/bash

echo "🔄 Stopping and removing existing containers..."
docker compose down

echo "🔨 Building containers without cache..."
docker compose build --no-cache

echo "🚀 Starting containers in watch (attached) mode..."
docker compose up --watch
