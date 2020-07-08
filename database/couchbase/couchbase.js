// this file is to implement querying /GET
// export function to server side

var ottoman = require('ottoman');
var couchbase = require('couchbase');



const getPropertyOrProperties = (id, cb) => {
  let option = id ? {id: id} || {headline: id} : {};

  similarProperties.find(option), (err, data) => {
    if (err) {
      console.log('Could not get property or properties.');
      return err;
    };

    cb(data);
  });
};


// var filters = {
//   lastName: 'Smith',
//   state: 'VA'
// };

// var options = {
//   limit: 12,
//   consistency: ottoman.Consistency.LOCAL
// };

// Customer.find(filters, options,
//   function(err, items) {
//     if (err) throw err;

//     console.log('sim props here ', JSON.stringify(items));
//   })




// const getPropertyOrProperties = (id, cb) => {

//   getPropertyByHeadlineQuery = N1qlQuery.fromString('SELECT * FROM `simprops` WHERE headline = $1');

//   getPropertyByIDQuery = N1qlQuery.fromString('SELECT * FROM `simprops` WHERE id = $1');


//   if (id) {
//     // QUERIES BY ID DEPENDENT ON HEADLINE OR NUMERICAL LISTING ID
//     let headlineAsID = Number.isNaN(parseInt(id));

//     if (headlineAsID) {
//       bucket
//         .query(getPropertyByHeadlineQuery, [id])
//         .then(results => console.log('query by headline result here: ', results)) // cb(results)
//         .catch(console.log(err))
//     } else {
//       bucket
//       .query(getPropertyByIDQuery, [id])
//       .then(results => console.log('query by id result here: ', results)) // cb(results)
//       .catch(err => console.log(err))
//     };

//   } else {
//     // QUERIES FOR ALL PROPERTIES
//     bucket
//       .query('SELECT * FROM `simprops`')
//       .then(results => cb(results.rows))
//       .catch(console.log(err))
//   };

// };

// // GETS 12 SIMILAR PROPERTIES BY LOCATION AND PRICE RANGE, BIAS TOWARDS 10% OF DATA SET
// const getSimilarProperties = (id, location, pricing, cb) => {

//   pool
//     .query('SELECT * FROM `simprops` WHERE id != $1 AND location = $2 AND pricing BETWEEN ($3 - 25) AND ($3 + 25) AND id > 8999999 LIMIT 12')
//     .then(results => cb(results.rows))
//     .catch(err=> console.log(err))
// };

module.exports = {
  getPropertyOrProperties,
  getSimilarProperties
};