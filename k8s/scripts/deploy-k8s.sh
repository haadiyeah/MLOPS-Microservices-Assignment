#!/bin/bash

echo "Deploying application to Minikube..."

# Create MongoDB resources
echo "Creating MongoDB resources..."
kubectl apply -f k8s/mongo-persistent-volume.yaml
kubectl apply -f k8s/mongo-persistent-volume-claim.yaml
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/mongo-service.yaml

# Wait for MongoDB to be ready
echo "Waiting for MongoDB to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/mongo-deployment

# Create Auth Service resources
echo "Creating Auth Service resources..."
kubectl apply -f k8s/auth-configmap.yaml
kubectl apply -f k8s/auth-secret.yaml
kubectl apply -f k8s/auth-deployment.yaml
kubectl apply -f k8s/auth-service.yaml

# Create Backend Service resources
echo "Creating Backend Service resources..."
kubectl apply -f k8s/backend-configmap.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml

# Create Frontend Service resources
echo "Creating Frontend Service resources..."
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml

# Get the Frontend URL
echo "Waiting for all deployments to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/auth-deployment
kubectl wait --for=condition=available --timeout=300s deployment/backend-deployment
kubectl wait --for=condition=available --timeout=300s deployment/frontend-deployment

echo "Application deployed successfully!"
echo "You can access the application at: $(minikube service frontend-service --url)"