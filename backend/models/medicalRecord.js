const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
  index: {
    type: String,
    required: true,
    minlength: 7,
    match: /^sc[0-9]{5}$/,
    ref: 'User'
  },
  reason: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  year: {
    type: Number,
    required: true,
    min: 1,
    max: 4
  },
  semester: {
    type: Number,
    required: true,
    min: 1, max: 2
  },
  livingPlace: {
    type: String,
    required: true,
    match: /^(hostel|boarding)$/
  },
  date: Date
});

const MedicalRecord = mongoose.model('Medical Record', schema);

const validate = (record) => {
  const schema = Joi.object({
    index: Joi.string().required().regex(/^sc[0-9]{5}$/).min(7),
    reason: Joi.string().min(5).max(50).required(),
    year: Joi.number().min(1).max(4).required(),
    semester: Joi.number().min(1).max(2).required(),
    livingPlace: Joi.string().regex(/^(hostel|boarding)$/).required()
  });

  return schema.validate(record);
}

module.exports = { MedicalRecord, validate };