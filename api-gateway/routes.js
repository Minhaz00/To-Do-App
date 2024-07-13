const express = require('express');
const axios = require('axios');
const router = express.Router();
const TODO_SERVICE_URL = process.env.TODO_SERVICE_URL;

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${TODO_SERVICE_URL}/tasks`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a specific task by ID
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${TODO_SERVICE_URL}/tasks/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add a new task
router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${TODO_SERVICE_URL}/tasks`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a task by ID
router.delete('/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${TODO_SERVICE_URL}/tasks/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
