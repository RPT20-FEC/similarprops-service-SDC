// var ottoman = require('ottoman');
var couchbase = require('couchbase');

var cluster = new couchbase.Cluster('127.0.0.1', {
  username: 'admin',
  password: 'workwork',
});

var bucket = cluster.bucket('similarprops');
var coll = bucket.defaultCollection();
var N1qlQuery = require('couchbase').N1qlQuery;

// var N1qlQuery = couchbase.N1qlQuery;
// bucket.enableN1ql(['http://localhost:8091/']);





// TEST FUNC TO SEE IF CONNECTION VALID
// coll.upsert('testdoc', { name: 'Frank' })
//   .then (result => {
//     coll.get('testdoc')
//       .then(result => console.log(result.value))
//       .catch(err => console.log('get error here', err));
//   })
//   .catch(err => console.log('upsert error here', err));





module.exports.cluster = cluster;

