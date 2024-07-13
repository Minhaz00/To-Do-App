const redis = require('redis');
const { v4: uuidv4 } = require('uuid'); // Import UUID library
const client = redis.createClient({
  url: process.env.REDIS_URL
});

client.connect();

exports.getTasks = async (req, res) => {
  try {
    const tasks = await client.hGetAll('tasks'); // Use hGetAll to get all tasks with their IDs
    const tasksArray = Object.keys(tasks).map(id => ({
      id,
      task: tasks[id]
    }));
    res.json(tasksArray);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await client.hGet('tasks', taskId); // Get task by ID
    if (task) {
      res.json({ id: taskId, task });
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.addTask = async (req, res) => {
  try {
    const task = req.body.task;
    const taskId = uuidv4(); // Generate a unique ID for the task
    await client.hSet('tasks', taskId, task); // Store task in a hash with the task ID
    res.send({ id: taskId, task });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    await client.hDel('tasks', taskId); // Delete the task by ID
    res.send('Task deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
