const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const similarPropertiesSchema = new mongoose.Schema({
  listingId: {type: Number, required: true, unique: true},
  assets: [String],
  location: String,
  typeOfRoom: String,
  totalBeds: Number,
  headline: String,
  price: Number,
  stars: Number,
  reviews: Number
});

const similarProperties = mongoose.model('SimilarProperties', similarPropertiesSchema);



module.exports = similarProperties;