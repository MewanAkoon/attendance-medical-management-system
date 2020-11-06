const express = require('express');
const router = express.Router();
const { getUsers } = require('../db/users');

const users = getUsers();

router.get('/', (req, res) => {
  res.send(users);
});

module.exports = router;