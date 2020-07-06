var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('127.0.0.1', {
  username: 'admin',
  password: 'workwork',
});

var bucket = cluster.bucket('testbucket');
var coll = bucket.defaultCollection();

coll.upsert('testdoc', { name: 'Frank' })
  .then (result => {
    coll.get('testdoc')
      .then(result => console.log(result.value))
      .catch(err => console.log('get error here', err));
  })
  .catch(err => console.log('upsert error here', err));

