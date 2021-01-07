const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  firstName: { type: String, required: true },
  username: { type: String, required: true },
  cityOrTown: String,
  country: String,
  role: {
    type: String,
    required: true,
    match: /^(admin|lecturer|student|medical|head)$/
  },
  password: {
    type: String,
    required: true
  },
  courses: [{
    type: String,
    match: /^(CSC|MAT|FSC|AMT|PHY)[a-zA-Z0-9]{3}([0-9]|α|β|δ)$/,
    ref: 'Course'
  }]
});

const User = mongoose.model('User', schema);

const validate = (user) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    firstName: Joi.string().required(),
    username: Joi.string().required(),
    cityOrTown: Joi.string().min(3),
    country: Joi.string().min(3),
    role: Joi.string().required().regex(/^(admin|lecturer|student|medical|head)$/),
    password: Joi.string().required().min(8),
    courses: Joi.array().items(Joi.string().regex(/^(CSC|MAT|FSC|AMT|PHY)[a-zA-Z0-9]{3}([0-9]|α|β|δ)/))
  });

  return schema.validate(user);
}

module.exports = { User, validate };