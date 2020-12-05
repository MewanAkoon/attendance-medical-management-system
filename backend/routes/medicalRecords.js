const express = require('express');
const router = express.Router();

const { getMedicalRecords, getMedicalRecord, addMedicalRecord } = require('../db/medicalRecords');
const { MedicalRecord, validate } = require('../models/medicalRecords');

router.get('/', (req, res) => {
  const medicals = getMedicalRecords();
  res.status(200).json(medicals);
});

router.get('/:index', (req, res) => {
  const medical = getMedicalRecord(req.params.index);
  res.status(200).json(medical);
});

router.post('/', (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const record = new MedicalRecord({ ...req.body, date: Date.now() });
  addMedicalRecord(record);
  res.send(record);
});

module.exports = router;