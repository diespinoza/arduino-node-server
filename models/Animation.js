// Models for documents using Mongose
const mongoose = require('mongoose');

const AnimationSchema = new mongoose.Schema({
  name: {
    type: String,
    requiredL: [true, 'must provide name'],
    trim:true,
    maxlength: [20, 'name cannot be more than 20 characters'],
  },
  delay: {
    type: Number,
    default: 10
  },
});
