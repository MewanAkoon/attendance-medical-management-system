const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
  index: {
    type: String,
    required: true,
    minlength: 7,
    match: /^sc[0-9]{5}$/
  },
  reason: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  date: Date
});

const MedicalRecord = mongoose.model('Medical Record', schema);

const validate = (record) => {
  const schema = Joi.object({
    index: Joi.string().required().regex(/^sc[0-9]{5}$/).min(7),
    reason: Joi.string().min(5).max(50).required()
  });

  return schema.validate(record);
}

module.exports = { MedicalRecord, validate };

const dummy = [
  {
    index: 'sc10266',
    reason: 'Hypertension'
  },
  {
    index: 'sc10262',
    reason: 'Anxiety'
  },
  {
    index: 'sc10264',
    reason: 'Back pain'
  }
]