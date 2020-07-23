var couchbase = require('couchbase');

var cluster = new couchbase.Cluster('13.56.158.70', {
  username: 'admin',
  password: 'workwork',
});

var bucket = cluster.bucket('similarprops');
var coll = bucket.defaultCollection();


module.exports = cluster;

