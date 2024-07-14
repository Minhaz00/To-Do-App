# Variables
DOCKER_USERNAME=minhaz71
API_GATEWAY_IMAGE=$(DOCKER_USERNAME)/api-gateway
TODO_SERVICE_IMAGE=$(DOCKER_USERNAME)/todo-service
VERSION=latest

# Docker login command
docker-login:
	@echo "Logging in to DockerHub..."
	@docker login -u $(DOCKER_USERNAME)

# Docker build and push commands
build-api-gateway:
	@echo "Building API Gateway image..."
	@docker build -t $(API_GATEWAY_IMAGE):$(VERSION) ./api-gateway

build-todo-service:
	@echo "Building ToDo Service image..."
	@docker build -t $(TODO_SERVICE_IMAGE):$(VERSION) ./todo-service

push-api-gateway: docker-login
	@echo "Pushing API Gateway image to DockerHub..."
	@docker push $(API_GATEWAY_IMAGE):$(VERSION)

push-todo-service: docker-login
	@echo "Pushing ToDo Service image to DockerHub..."
	@docker push $(TODO_SERVICE_IMAGE):$(VERSION)

# Kubernetes deployment
deploy:
	@echo "Deploying Redis to Kubernetes..."
	@kubectl apply -f ./K8s-deployment-manifests/redis-deployment.yaml

	@echo "Deploying ToDo Service to Kubernetes..."
	@kubectl apply -f ./K8s-deployment-manifests/todo-service-deployment.yaml

	@echo "Deploying API Gateway to Kubernetes..."
	@kubectl apply -f ./K8s-deployment-manifests/api-gateway-deployment.yaml

# Combined commands
build-and-push: build-api-gateway build-todo-service push-api-gateway push-todo-service

all: build-and-push deploy

.PHONY: docker-login build-api-gateway build-todo-service push-api-gateway push-todo-service deploy-redis deploy-todo-service deploy-api-gateway deploy build-and-push all
