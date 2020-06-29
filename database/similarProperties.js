const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const similarPropertiesSchema = new mongoose.Schema({
  listingId: {type: Number, required: true, unique: true},
  assets: [String],
  location: String,
  typeOfRoom: String,
  totalBeds: Number,
  headline: {type: String, required: true, unique: true},
  price: Number,
  stars: Number,
  reviews: Number
});

const similarProperties = mongoose.model('SimilarProperties', similarPropertiesSchema);

const getPropertyorProperties = (id, cb) => {
  let option = id ? {listingId: id} || {headline: id} : {};

  similarProperties.find(option).exec((err, data) => {
    if (err) {
      console.log('Could not get property or properties.');
      return err;
    };

    cb(data);
  });
};

const createProperty = (data, cb) => {
  similarProperties.create((data, err) => {
    if (err) { console.log(err); }
    cb();
  });
};

const updateProperty = (id, data) => {
  // checks to see- if id is NaN, means it's the headline
  let stringId = Number.isNaN(parseInt(id));
  let updateOption = stringId ? {headline: id} : {listingId: id};
  similarProperties.findOneAndUpdate(updateOption, {$set: data}, {upsert: true});
};

const deleteProperty = (id, cb) => {
  let stringId = Number.isNaN(parseInt(id));
  let deleteOption = stringId ? {headline: id} : {listingId: id};
  similarProperties.deleteOne(deleteOption, (err) => {
    if (err) { return console.log(err); }
    cb();
  });
};


module.exports = {
  getPropertyorProperties,
  createProperty,
  updateProperty,
  deleteProperty
};