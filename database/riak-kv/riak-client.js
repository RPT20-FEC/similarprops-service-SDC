var Riak = require('basho-riak-client');

var nodes = [
    'riak-test:10017',
    'riak-test:10027',
    'riak-test:10037',
    'riak-test:10047'
];
var client = new Riak.Client(nodes, function (err, c) {
    // NB: at this point the client is fully initialized, and
    // 'client' and 'c' are the same object
});

var assert = require('assert');

client.ping(function (err, rslt) {
    if (err) {
        throw new Error(err);
    } else {
        // On success, ping returns true
        assert(rslt === true);
    }
});

module.exports = client;