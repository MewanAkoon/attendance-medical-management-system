const express = require('express');
const app = express();
const helmet = require('helmet');
const usersRoute = require('./routes/users');

app.use(express.json());
app.use(helmet());
app.use('/users', usersRoute);

app.get('/', (req, res) => {
  res.send('Hello');
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log('Listening on port', PORT));