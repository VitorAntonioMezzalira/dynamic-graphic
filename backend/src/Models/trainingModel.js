const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  date: { type: Date, require: true },
  duration: { type: Number, require: true },
  distance: { type: Number, require: true }
});

const trainingModel = mongoose.model('Training', trainingSchema);

module.exports = trainingModel;