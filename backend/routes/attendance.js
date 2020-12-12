const express = require('express');
const router = express.Router();
const moment = require('moment');

const { Attendance, validate } = require('../models/attendance');

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

module.exports = router;