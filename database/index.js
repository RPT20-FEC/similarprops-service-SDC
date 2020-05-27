require('dotenv').config();
const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URI; 

const db = mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);

const similarProperties = require('./similarProperties.js');

module.exports.db = db;
