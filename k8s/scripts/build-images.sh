#!/bin/bash

echo "Building Docker images for Minikube..."

# Set Minikube's Docker daemon
echo "Configuring to use Minikube's Docker daemon..."
eval $(minikube docker-env)

# Build the images
echo "Building frontend service image..."
docker build -t frontend-service:latest ./frontend

echo "Building auth service image..."
docker build -t auth-service:latest ./auth-service

echo "Building backend service image..."
docker build -t backend-service:latest ./backend-service

echo "All images built successfully!"