const SimilarProperties = ottoman.model('Property', {
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
}, {
  index: { findByLocation: {by: 'location', type: 'n1ql'} }
});

ottoman.ensureIndices(function(err) {
if (err) {
  console.log('failed to created necessary indices', err);
  return;
}

console.log('ottoman indices are ready for use!');
});


module.exports.SimilarProperties = SimilarProperties;