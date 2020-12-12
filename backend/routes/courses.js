const express = require('express');
const router = express.Router();
const moment = require('moment');

const { Course, validate, validatePassword } = require('../models/course');

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('lecturer', { firstName: 1, username: 1 });
    if (courses.length === 0) return res.status(404).send('No courses in the database...');
    res.send(courses);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/:code', async (req, res) => {
  try {
    const course = await Course.findOne({ code: req.params.code }).populate('lecturer', { firstName: 1, username: 1 });
    if (!course) return res.status(404).send('Error, course not found...');
    res.send(course);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  try {
    const course = new Course(req.body);
    await course.save();
    res.send(course);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch('/:code/:password', async (req, res) => {
  const { error } = validatePassword({ password: req.params.password });
  if (error) return res.status(404).send(error.details[0].message);

  const timestamp = moment().format('YYYY:MM:DD HH:mm:ss');

  try {
    let course = await Course.findOne({ code: req.params.code });
    course.password = req.params.password;
    course.dates.push(timestamp);

    course = await course.save();
    res.send(course);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;