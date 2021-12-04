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
    default: 10,
    min: 0,
    max: 0xFFFFFFFFFFFFFFFF
    //Largest number arduino accepts it long long or 64 bytes
    //Represented by 16 letter F's in hex.
    //In decimcal it should be :18446744073709551615.
    //Website rounds up to:  18446744073709552000
    //not sure why, maybe error in storing the variable somewhere or in rendering the ejs
  },
});

module.exports = mongoose.model('Animation', AnimationSchema);
