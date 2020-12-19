const express = require('express');
const router = express.Router();
const moment = require('moment');

const { Course, validate, validatePasswordAndLecture } = require('../models/course');

// Get all the courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('lecturer', { firstName: 1, username: 1 });
    if (courses.length === 0) return res.status(404).send('No courses in the database...');
    res.send(courses);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get a specfied course
// Course code is passed via parameters
router.get('/:code', async (req, res) => {
  try {
    const course = await Course.findOne({ code: req.params.code }).populate('lecturer', { firstName: 1, username: 1 });
    if (!course) return res.status(404).send('Error, course not found...');
    res.send(course);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Add a course to the database
// Required: code, name
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

// Adds a temporary password.
// Adds the current date and lecture name
// Lecture name is passed via body
router.patch('/:code/:password', async (req, res) => {
  console.log(req.body);
  const { error } = validatePasswordAndLecture(
    { password: req.params.password, lecture: req.body.lecture });
  if (error) return res.status(404).send(error.details[0].message);

  const timestamp = moment().format('YYYY:MM:DD HH:mm:ss');

  try {
    let course = await Course.findOne({ code: req.params.code });
    course.password = req.params.password;

    const dateItem = {
      date: timestamp,
      lecture: req.body.lecture
    }
    course.dates.push(dateItem);

    course = await course.save();
    res.send(course);

    const timeOut = 5 * 60 * 1000; // 5 mins
    setTimeout(() => deleteCoursePassword(req.params.code), timeOut);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

const deleteCoursePassword = async code => {
  try {
    const course = await Course.findOne({ code });
    course.password = undefined;
    await course.save();
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
}

module.exports = router;