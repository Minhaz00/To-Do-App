const redis = require('redis');

const client = redis.createClient({
  url: process.env.REDIS_URL
});

client.connect();

const getTasks = async (req, res) => {
  try {
    const tasks = await client.lRange('tasks', 0, -1);
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addTask = async (req, res) => {
  try {
    const task = req.body.task;
    await client.rPush('tasks', task);
    res.send('Task added');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = req.body.task;
    await client.lRem('tasks', 0, task);
    res.send('Task deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
};


module.exports = {
  getTasks,
  addTask,
  deleteTask
};