Sure, here's an example of how you can structure your project and implement the API gateway and ToDo service using Express and Redis.

### Project Structure

```
todo-app/
│
├── api-gateway/
│   ├── node_modules/
│   ├── .env
│   ├── package.json
│   ├── index.js
│   └── routes.js
│
├── todo-service/
│   ├── node_modules/
│   ├── .env
│   ├── package.json
│   ├── index.js
│   └── todoController.js
│
└── docker-compose.yml
```

### API Gateway

#### `api-gateway/.env`

```plaintext
PORT=5000
TODO_SERVICE_URL=http://localhost:8000
```

#### `api-gateway/package.json`

```json
{
  "name": "api-gateway",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "axios": "^0.27.2",
    "dotenv": "^16.0.1",
    "express": "^4.18.1"
  }
}
```

#### `api-gateway/index.js`

```javascript
const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`API Gateway listening at http://localhost:${port}`);
});
```

#### `api-gateway/routes.js`

```javascript
const express = require('express');
const axios = require('axios');
const router = express.Router();
const TODO_SERVICE_URL = process.env.TODO_SERVICE_URL;

router.get('/get', async (req, res) => {
  try {
    const response = await axios.get(`${TODO_SERVICE_URL}/get-task`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/add', async (req, res) => {
  try {
    const response = await axios.post(`${TODO_SERVICE_URL}/add-task`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const response = await axios.delete(`${TODO_SERVICE_URL}/delete-task`, { data: req.body });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
```

### ToDo Service

#### `todo-service/.env`

```plaintext
PORT=8000
REDIS_URL=redis://localhost:6379
```

#### `todo-service/package.json`

```json
{
  "name": "todo-service",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "redis": "^4.1.0"
  }
}
```

#### `todo-service/index.js`

```javascript
const express = require('express');
const dotenv = require('dotenv');
const todoController = require('./todoController');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.get('/get-task', todoController.getTasks);
app.post('/add-task', todoController.addTask);
app.delete('/delete-task', todoController.deleteTask);

app.listen(port, () => {
  console.log(`ToDo service listening at http://localhost:${port}`);
});
```

#### `todo-service/todoController.js`

```javascript
const redis = require('redis');
const client = redis.createClient({
  url: process.env.REDIS_URL
});

client.connect();

exports.getTasks = async (req, res) => {
  try {
    const tasks = await client.lRange('tasks', 0, -1);
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.addTask = async (req, res) => {
  try {
    const task = req.body.task;
    await client.rPush('tasks', task);
    res.send('Task added');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = req.body.task;
    await client.lRem('tasks', 0, task);
    res.send('Task deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
```

### Docker Compose

#### `docker-compose.yml`

```yaml
version: '3.8'

services:
  redis:
    image: 'redis:latest'
    ports:
      - '6379:6379'
  
  api-gateway:
    build: ./api-gateway
    ports:
      - '5000:5000'
    environment:
      - TODO_SERVICE_URL=http://todo-service:8000
    depends_on:
      - todo-service

  todo-service:
    build: ./todo-service
    ports:
      - '8000:8000'
    environment:
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
```

### Running the Application

1. Navigate to the root directory of your project.
2. Run `docker-compose up --build`.

This setup will create the API gateway and ToDo services, and use Redis as the database. The client can make requests to the API gateway, which will forward them to the ToDo service, and the tasks will be stored in Redis.