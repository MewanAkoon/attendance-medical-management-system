const express = require('express');
const router = express.Router();
const { getUsers, getUser, addUser } = require('../db/users');
const { User, validate } = require('../models/user');


router.get('/', (req, res) => {
  const role = req.query.role ? req.query.role : '';
  const users = getUsers(role);
  res.status(200).json(users);
});

router.get('/:id', (req, res) => {
  const role = req.query.role ? req.query.role : '';
  const user = getUser(req.params.id, role);
  if (user) return res.status(200).send(user);
  res.status(404).send('Error, user not found');
});

router.post('/', (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const user = new User(req.body);
  addUser(user);
  res.send(user);
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