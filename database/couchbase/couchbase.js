// this file is to implement querying /GET
// export function to server side

var couchbase = require('couchbase');
var cluster = require('./cluster.js');

console.log(cluster);



const getPropertyOrProperties = async (inputId) => {

  let headlineAsId = Number.isNaN(parseInt(inputId));

  if (headlineAsId) {
    var queryByHeadline = `SELECT * FROM \`similarprops\` WHERE headline =$HEADLINE`;
    try {
      var result = await cluster.query(queryByHeadline, {parameters: {HEADLINE: `${inputId}`}});
      let rows = result.rows;
      return rows;
      // res.send(rows);
    } catch (error) {
      console.log('Error retrieving property by headline: ', error);
    }
  } else {

    var queryById = `SELECT * FROM \`similarprops\` WHERE listingId =$LISTINGID`;

    try {
      var result = await cluster.query(queryById, {parameters: {LISTINGID: `${inputId}`}});

      let rows = result.rows;
      return rows;
      // res.send(rows);
    } catch (error) {
      console.log('Error retrieving property by listing ID: ', error);
    }

  };

};

const getSimilarProperties = (id, cb) => {



};




module.exports = {
  getPropertyOrProperties,
  getSimilarProperties
};