const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const schema = new mongoose.Schema({
  student: {
    type: String,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  timestamp: {
    type: String,
    required: true
  }
});

const Attendance = mongoose.model('Attendance', schema);

const validate = body => {
  const schema = Joi.object({
    student: Joi.string().min(7).required(),
    course: Joi.objectId().min(7).required()
  });

  return schema.validate(body);
}

module.exports = { Attendance, validate };