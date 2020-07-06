var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://127.0.0.1', {
  username: 'username',
  password: 'password',
});

var bucket = cluster.bucket('default');
var coll = bucket.defaultCollection();

coll.upsert('testdoc', { name: 'Frank' })
  .then (result => {
    coll.get('testdoc')
      .then(result => console.log(result.value))
      .catch(err => console.log('get error here', err));
  })
  .catch(err => console.log('upsert error here', err));

