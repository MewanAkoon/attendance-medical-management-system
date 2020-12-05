const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    match: /^sc[0-9]{5}$/
  },
  firstName: { type: String, required: true },
  username: { type: String, required: true },
  cityOrTown: String,
  country: String,
  role: {
    type: String,
    required: true,
    match: /^(admin|lecturer|student|medical)$/
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
});

const User = mongoose.model('User', schema);

const validate = (user) => {
  const schema = Joi.object({
    id: Joi.string().required().regex(/^sc[0-9]{5}$/),
    firstName: Joi.string().required(),
    username: Joi.string().required(),
    cityOrTown: Joi.string().min(3),
    country: Joi.string().min(3),
    role: Joi.string().required().regex(/^(admin|lecturer|student|medical)$/),
    password: Joi.string().required().min(8)
  });

  return schema.validate(user);
}

module.exports = { User, validate };