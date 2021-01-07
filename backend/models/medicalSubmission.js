const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const schema = new mongoose.Schema({
  index: {
    type: String,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  registeredNumber: {
    type: String,
    required: true
  },
  academicYear: {
    type: Number,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  absentLectures: [{
    code: String,
    name: String,
    day: String
  }],
  timestamp: {
    type: Date,
    required: true
  },
  mcNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medical Record',
    required: true
  }
});

const MedicalSubmission = mongoose.model('Medical Submission', schema);

const validate = (record) => {
  const schema = Joi.object({
    index: Joi.string().max(7).required(),
    name: Joi.string().min(5).required(),
    address: Joi.string().min(5).max(50).required(),
    contactNumber: Joi.string().regex(/^[0-9]{10}$/).required(),
    registeredNumber: Joi.string().required(),
    academicYear: Joi.number().required(),
    level: Joi.number().required().min(1).max(4),
    semester: Joi.number().required().min(1).max(2),
    absentLectures: Joi.array().required(),
    mcNumber: Joi.objectId().required()
  });

  return schema.validate(record);
}

module.exports = { MedicalSubmission, validate };