const mongoose = require('mongoose');

const { Schema } = mongoose;

const peopleSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model('people', peopleSchema);
