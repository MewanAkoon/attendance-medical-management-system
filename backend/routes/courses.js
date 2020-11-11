const express = require('express');
const router = express.Router();

const { getCourses, getCourse } = require('../db/courses');

const courses = getCourses();

router.get('/', (req, res) => {
  res.status(200).json(courses);
});

router.get('/:code', (req, res) => {
  const course = getCourse(req.params.code);
  if (!course) res.status(404).send('Course not found');
  res.status(200).json(course);
});

module.exports = router;