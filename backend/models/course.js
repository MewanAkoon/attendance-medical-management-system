const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    match: /^(CSC|MAT|FSC|AMT|PHY)[a-zA-Z0-9]{3}([0-9]|α|β|δ)$/
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  schedule: {
    day: { type: Number, min: 1, max: 7 },
    startTime: { type: Number, min: 8, max: 17 },
    duration: { type: Number, min: 1, max: 5 }
  },
  lecturer: {
    type: String,
    ref: 'User'
  },
  password: {
    type: String,
    minlength: 10
  },
  dates: [String]
});

const Course = mongoose.model('Course', schema);

const validate = course => {
  const schema = Joi.object({
    code: Joi.string().required().regex(/^(CSC|MAT|FSC|AMT|PHY)[a-zA-Z0-9]{3}([0-9]|α|β|δ)$/),
    name: Joi.string().required().min(5).max(50),
    schedule: Joi.object({
      day: Joi.number().min(1).max(7),
      startTime: Joi.number().min(8).max(17),
      duration: Joi.number().min(1).max(5)
    }),
    lecturer: Joi.string()
  });

  return schema.validate(course);
};

const validatePassword = password => {
  const schema = Joi.object({
    password: Joi.string().min(7).max(13).required()
  });
  return schema.validate(password);
};

module.exports = { Course, validate, validatePassword };