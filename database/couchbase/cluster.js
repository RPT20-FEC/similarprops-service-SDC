var couchbase = require('couchbase');

var cluster = new couchbase.Cluster('127.0.0.1', {
  username: 'admin',
  password: 'workwork',
});

var bucket = cluster.bucket('similarprops');
var coll = bucket.defaultCollection();


module.exports = cluster;

