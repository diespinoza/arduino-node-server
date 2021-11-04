// Models for documents using Mongose
const mongoose = require('mongoose');

const AnimationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim:true,
    maxlength: [20, 'name cannot be more than 20 characters'],
  },
  delay: {
    type: Number,
    required: [true, 'must provide delay'],
    default: 10
  },
});

module.exports = mongoose.model('Animation', AnimationSchema);
