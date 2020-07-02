const client = require('./riak-client.js');


const getPropertyOrProperties = (id, cb) => {

  if (id) {
    // QUERIES BY ID DEPENDENT ON HEADLINE OR NUMERICAL LISTING ID
    let headlineAsID = Number.isNaN(parseInt(id));

    if (headlineAsID) {
      pool
        .query('SELECT * FROM properties WHERE headline = $1', [id])
        .then(results => cb(results.rows))
        .catch(console.log(err))
    } else {
      pool
      .query('SELECT * FROM properties WHERE id = $1', [id])
      .then(results => cb(results.rows))
      .catch(err => console.log(err))
    };

  } else {
    // QUERIES FOR ALL PROPERTIES
    pool
      .query('SELECT * FROM properties')
      .then(results => cb(results.rows))
      .catch(console.log(err))
  };

};

// GETS 12 SIMILAR PROPERTIES BY LOCATION AND PRICE RANGE, BIAS TOWARDS 10% OF DATA SET
const getSimilarProperties = (id, location, pricing, cb) => {

  pool
    .query('SELECT * FROM properties WHERE id != $1 AND location = $2 AND pricing BETWEEN ($3 - 25) AND ($3 + 25) AND id > 8999999 LIMIT 12')
    .then(results => cb(results.rows))
    .catch(err=> console.log(err))
};




module.exports = getSimilarProperties;