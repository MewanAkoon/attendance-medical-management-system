const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require("cors");
const mongoose = require('mongoose');

const usersRoute = require('./routes/users');
const coursesRoute = require('./routes/courses');
const medicalsRoute = require('./routes/medicalRecords');
const attendanceRoute = require('./routes/attendance');
const submitMedicalRoute = require('./routes/medicalSubmission');

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

mongoose.connect('mongodb://localhost/amms', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Couldn\'t connect to MongoDB...', err));

app.use('/api/users', usersRoute);
app.use('/api/courses', coursesRoute);
app.use('/api/medicals', medicalsRoute);
app.use('/api/attendance', attendanceRoute);
app.use('/api/submitMedical', submitMedicalRoute);;

app.get('/', (req, res) => {
  res.send('Welcome to AMMS - UOR');
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log('Listening on port', PORT));