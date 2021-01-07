const express = require('express');
const router = express.Router();

const { MedicalSubmission, validate } = require('../models/medicalSubmission');

router.get('/', async (req, res) => {
  try {
    const records = await MedicalSubmission.find()
      .populate('index', 'firstName username')
      .populate('mcNumber', 'reason date');
    res.send(records);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/:studentId', async (req, res) => {
  try {
    const records = await MedicalSubmission.find({ index: req.params.studentId });
    res.send(records);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  try {
    const record = new MedicalSubmission({ ...req.body, timestamp: Date.now() });
    await record.save();
    res.send(record);
  } catch (err) {
    res.status(400).send(err.message)
  }
});

module.exports = router;
