const express = require('express');
const router = express.Router();
const { getUsers, getUser } = require('../db/users');

const users = getUsers();

router.get('/', (req, res) => {
  res.status(200).json(users);
});

router.get('/:id', (req, res) => {
  const user = getUser(req.params.id);
  if (user) return res.status(200).send(user);
  res.status(404).send('Error');
});

router.post('/:id/:password', (req, res) => {
  const user = getUser(req.params.id);
  if (user) {
    if (user.password === req.params.password) return res.status(200).send(user);
    return res.status(401).send('Invalid login, please try again');
  }
  res.status(404).send('Invalid login, user not found');
});

module.exports = router;