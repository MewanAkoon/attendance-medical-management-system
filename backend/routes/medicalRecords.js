const express = require('express');
const router = express.Router();

const { getMedicalRecords, getMedicalRecord } = require('../db/medicalRecords');

router.get('/', (req, res) => {
  const medicals = getMedicalRecords();
  res.status(200).json(medicals);
});

router.get('/:index', (req, res) => {
  const medical = getMedicalRecord(req.params.index);
  res.status(200).json(medical);
});


module.exports = router;