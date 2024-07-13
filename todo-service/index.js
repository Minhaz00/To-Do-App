const express = require('express');
const dotenv = require('dotenv');
const todoController = require('./todoController');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get('/tasks', todoController.getTasks);
app.get('/tasks/:id', todoController.getTaskById);
app.post('/tasks', todoController.addTask);
app.delete('/tasks/:id', todoController.deleteTask);

app.listen(port, () => {
  console.log(`ToDo service listening at http://localhost:${port}`);
});
