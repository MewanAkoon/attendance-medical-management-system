const express = require('express');
const router = express.Router();
const moment = require('moment');

const { Attendance, validate } = require('../models/attendance');
const { Course } = require('../models/course');

router.get('/', async (req, res) => {
  try {
    const attendances = await Attendance.find()
      .populate('course', 'code name')
      .populate('student', 'firstName username');
    if (attendances.length === 0) return res.status(404).send('No records in the database...');
    res.send(attendances);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/:studentId/:courseId', async (req, res) => {
  try {
    const attendance = await Attendance
      .findOne({ student: req.params.studentId, course: req.params.courseId })
      .populate('course', 'schedule');
    if (!attendance) return res.status(404).send(false);

    const marked = isMarked(attendance);
    res.send(marked);
  } catch (err) {
    res.status(400).send(false);
  }
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const timestamp = moment().format('YYYY:MM:DD HH:mm:ss');

  try {
    const attendance = new Attendance({ ...req.body, timestamp });
    await attendance.save();
    res.send(attendance);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/:code', async (req, res) => {
  try {
    const { _id: course } = await Course.findOne({ code: req.params.code }).select('_id');

    let attendances = await Attendance.find({ course })
      .populate('course', 'code name')
      .populate('student', 'firstName username');

    const date = getDate(req.body.date);

    attendances = attendances.filter(a => getDate(a.timestamp) === date);

    if (attendances.length === 0) return res.status(404).send(attendances);
    res.send(attendances);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/:studentId/:courseId', async (req, res) => {
  try {
    const attendance = await Attendance
      .find({ student: req.params.studentId, course: req.params.courseId })
      .select('timestamp -_id');
    if (!attendance) return res.status(404).send(attendance);
    res.send(attendance);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

const isMarked = attendance => {
  const timestamp = moment(attendance.timestamp, 'YYYY:MM:DD HH:mm:ss');
  const { schedule } = attendance.course;

  const marked =
    timestamp.day() === schedule.day &&
    timestamp.hour() >= schedule.startTime &&
    timestamp.hour() < schedule.startTime + schedule.duration;

  return marked;
}

const getDate = date => {
  return moment(date, 'YYYY:MM:DD HH:mm:ss').format('YYYY:MM:DD');
}

module.exports = router;