# To-Do App

## Makefile Documentation

### Overview

This `Makefile` automates the process of building Docker images, pushing them to DockerHub, and deploying the application to a Kubernetes cluster. The project consists of three main services:
- API Gateway
- ToDo Service
- Redis

### Variables

- **DOCKER_USERNAME**: DockerHub username.
- **API_GATEWAY_IMAGE**: Full name of the Docker image for the API Gateway.
- **TODO_SERVICE_IMAGE**: Full name of the Docker image for the ToDo service.
- **VERSION**: Version tag for the Docker images (default is `latest`).

### Targets

#### Docker Login

- **docker-login**
  
  Logs in to DockerHub using the specified username.
  
  ```sh
  make docker-login
  ```

#### Docker Build and Push

- **build-api-gateway**
  
  Builds the Docker image for the API Gateway.
  
  ```sh
  make build-api-gateway
  ```

- **build-todo-service**
  
  Builds the Docker image for the ToDo service.
  
  ```sh
  make build-todo-service
  ```

- **push-api-gateway**
  
  Logs in to DockerHub (if not already logged in) and pushes the API Gateway image.
  
  ```sh
  make push-api-gateway
  ```

- **push-todo-service**
  
  Logs in to DockerHub (if not already logged in) and pushes the ToDo service image.
  
  ```sh
  make push-todo-service
  ```

#### Kubernetes Deployment

- **deploy**
  
  Deploys the services to Kubernetes in the following order:
  1. Redis
  2. ToDo Service
  3. API Gateway
  
  ```sh
  make deploy
  ```

#### Combined Commands

- **build-and-push**
  
  Combines the build and push commands for both services.
  
  ```sh
  make build-and-push
  ```

- **all**
  
  Combines the `build-and-push` and `deploy` commands to build the Docker images, push them to DockerHub, and deploy them to Kubernetes in one go.
  
  ```sh
  make all
  ```

### Usage

1. **Log in to DockerHub**:

   Ensure you are logged in to DockerHub before pushing images:
   
   ```sh
   make docker-login
   ```

2. **Build and Push Docker Images**:

   To build and push the Docker images for both the API Gateway and ToDo service, run:
   
   ```sh
   make build-and-push
   ```

   Alternatively, you can run the commands individually:

   - Build the API Gateway image:
     ```sh
     make build-api-gateway
     ```

   - Build the ToDo service image:
     ```sh
     make build-todo-service
     ```

   - Push the API Gateway image to DockerHub:
     ```sh
     make push-api-gateway
     ```

   - Push the ToDo service image to DockerHub:
     ```sh
     make push-todo-service
     ```

3. **Deploy to Kubernetes**:

   To deploy all services to Kubernetes, run:
   
   ```sh
   make deploy
   ```

4. **Execute All Steps**:

   To build the Docker images, push them to DockerHub, and deploy them to Kubernetes in one go, run:
   
   ```sh
   make all
   ```

### Notes

- Ensure the `K8s-deployment-manifests` directory contains the `redis-deployment.yaml`, `todo-service-deployment.yaml`, and `api-gateway-deployment.yaml` files for the Kubernetes deployment to work correctly.
- Replace `<your-dockerhub-username>` with your actual DockerHub username in the `Makefile`.
