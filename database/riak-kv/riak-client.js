var assert = require('assert');
var Riak = require('basho-riak-client');

var nodes = [
    '127.0.0.1:8087'
];

var properties = new Riak.Client(nodes, function (err, client) {
  console.log('Now inside Riak.Client');
  client.ping(function (err, rslt) {
      console.log('Now entered client.ping');
      if (err) {
          console.log('There is an error encountered in client.ping');
          throw new Error(err);
      } else {
          // On success, ping returns true
          console.log('client.ping has resulted in success!');
          assert(rslt === true);
      }
      client.stop(function () {
          console.log('client is stopped');
          process.exit();
      });
  });
});

module.exports = properties;