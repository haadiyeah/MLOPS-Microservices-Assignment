# Microservices Application on Minikube

This project demonstrates a full-stack microservices application deployed on Minikube. It features a React frontend, Node.js backend services, MongoDB database, and user authentication with JWT.

## Architecture Overview

The application consists of four main microservices:

1. **Frontend Service**: React application serving the user interface
2. **Authentication Service**: Handles user signup, login, and password reset
3. **Backend API Service**: Provides business logic and data processing
4. **Database Service**: MongoDB for data storage

## Prerequisites

Ensure you have the following tools installed:

- Docker
- Docker Compose
- Minikube
- kubectl
- Node.js and npm

## Project Structure

```
microservices-demo/
├── frontend/                  # React frontend application
├── auth-service/              # Authentication microservice
├── backend-service/           # Backend API microservice
├── k8s/                       # Kubernetes manifests
├── scripts/                   # Deployment scripts
└── docker-compose.yml         # Docker Compose configuration
```

## Local Development with Docker Compose

To run the application locally using Docker Compose:

1. Clone the repository:
```bash
git clone 
cd 
```

2. Start the services:
```bash
docker-compose up -d
```

3. Access the application at http://localhost

4. To stop the services:
```bash
docker-compose down
```

## Deployment to Minikube

### Step 1: Start Minikube

```bash
minikube start
```

### Step 2: Build Docker Images

```bash
chmod +x scripts/build-images.sh
./scripts/build-images.sh
```

### Step 3: Deploy to Kubernetes

```bash
chmod +x scripts/deploy-k8s.sh
./scripts/deploy-k8s.sh
```

### Step 4: Access the Application

The script will display the URL where your application is accessible. Typically, it will be something like:
```
http://<minikube-ip>:30080
```

### Step 5: Monitoring

To monitor your deployments:
```bash
kubectl get pods
kubectl get services
kubectl get deployments
```

To view logs from a specific pod:
```bash
kubectl logs <pod-name>
```

## Testing the Application

1. Open the application URL in your browser
2. Create a new account using the Signup page
3. Log in with your credentials
4. You'll be directed to the Dashboard where you can see and manage your data
5. Test the password reset functionality by clicking "Forgot password?" on the login page

## Scaling the Application

To scale any of the services (e.g., increase the number of backend pods):
```bash
kubectl scale deployment backend-deployment --replicas=5
```

## Cleaning Up

To delete all resources:
```bash
kubectl delete -f k8s/
```

To stop Minikube:
```bash
minikube stop
```

## Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express
- **Authentication**: JWT, bcrypt
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose
- **Orchestration**: Kubernetes (Minikube)

## API Documentation

### Authentication Service (auth-service)

- `POST /api/auth/signup`: Create a new user account
- `POST /api/auth/login`: Authenticate a user
- `POST /api/auth/forgot-password`: Generate a password reset token
- `PATCH /api/auth/reset-password/:token`: Reset a user's password

### Backend Service (backend-service)

- `GET /api/data`: Get all data for the authenticated user
- `POST /api/data`: Create a new data entry
- `PUT /api/data/:id`: Update an existing data entry
- `DELETE /api/data/:id`: Delete a data entry