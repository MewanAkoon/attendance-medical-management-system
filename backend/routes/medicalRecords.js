const express = require('express');
const router = express.Router();
const { MedicalRecord, validate } = require('../models/medicalRecord');

router.get('/', async (req, res) => {
  try {
    const records = await MedicalRecord.find().populate('index', 'firstName username');
    if (records.length === 0) return res.status(404).send(records);
    res.send(records);
  } catch (err) {
    res.status(404).send([]);
  }
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  try {
    const record = new MedicalRecord({ ...req.body, date: Date.now() });
    console.log(record);
    await record.save();
    res.send(record);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message)
  }
});

module.exports = router;