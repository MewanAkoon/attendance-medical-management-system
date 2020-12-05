const express = require('express');
const router = express.Router();

const { getCourses, getCourse, addCourse } = require('../db/courses');
const { Course, validate } = require('../models/course');

const courses = getCourses();

router.get('/', (req, res) => {
  res.status(200).json(courses);
});

router.get('/:code', (req, res) => {
  const course = getCourse(req.params.code);
  if (!course) res.status(404).send('Course not found');
  res.status(200).json(course);
});

router.post('/', (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const course = new Course(req.body);
  addCourse(course);
  res.send(course);
});

module.exports = router;