const express = require('express');
const router = express.Router();
const { getUsers, getUser } = require('../db/users');

const users = getUsers();

router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:id', (req, res) => {
  const user = getUser(parseInt(req.params.id));
  if (user) return res.send(user);
  res.status(404).send('Error');
});

module.exports = router;