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
