var ottoman = require('ottoman');
var couchbase = require('couchbase');

var cluster = new couchbase.Cluster('127.0.0.1', {
  username: 'admin',
  password: 'workwork',
});

var bucket = cluster.bucket('simprops', function(err) {
  if (err) console.log(err);
});

// bucket.enableN1ql(['http://localhost:8091/']);

// var coll = bucket.defaultCollection();

// TEST FUNC TO SEE IF CONNECTION VALID
// coll.upsert('testdoc', { name: 'Frank' })
//   .then (result => {
//     coll.get('testdoc')
//       .then(result => console.log(result.value))
//       .catch(err => console.log('get error here', err));
//   })
//   .catch(err => console.log('upsert error here', err));

const similarProperties = ottoman.model('Property', {
  listingId: {type: 'number'},
  assets: {type: 'string'},
  location: {type: 'string'},
  typeOfRoom: {type: 'string'},
  totalBeds: {type: 'number'},
  headline: {type: 'string'},
  pricing: {type: 'number'},
  stars: {type: 'number'},
  reviews: {type: 'number'}
  }, {
  index: { findById: {by: 'listingId', type: 'n1ql'} }
});

ottoman.ensureIndices(function(err) {
if (err) {
  console.log('failed to created necessary indices', err);
  return;
}

console.log('ottoman indices are ready for use!');
});


module.exports.similarProperties = similarProperties;
module.exports.bucket = bucket;

