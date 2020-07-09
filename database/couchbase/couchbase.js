// this file is to implement querying /GET
// export function to server side

var couchbase = require('couchbase');
var cluster = require('./cluster.js');

const getPropertyOrProperties = async (inputId) => {

  if (inputId) {

    let headlineAsId = Number.isNaN(parseInt(inputId));

    if (headlineAsId) {
      var queryByHeadline = `SELECT * FROM \`similarprops\` WHERE headline =$HEADLINE`;

      try {
        var result = await cluster.query(queryByHeadline, {parameters: {HEADLINE: `${inputId}`}});
        let rows = result.rows[0].similarprops;
        return rows;
      } catch (error) {
        console.log('Error retrieving property by headline: ', error);
      };

    } else {

      var queryById = `SELECT * FROM \`similarprops\` WHERE listingId =$LISTINGID`;

      try {
        var result = await cluster.query(queryById, {parameters: {LISTINGID: `${inputId}`}});

        let rows = result.rows[0].similarprops;
        console.log(rows);
        return rows;
      } catch (error) {
        console.log('Error retrieving property by listing ID: ', error);
      };
    };

  } else {

    var queryAll = `SELECT * FROM \`similarprops\` LIMIT 3`;

    try {
      var result = await cluster.query(queryAll);

      let rows = result.rows[0].similarprops;
      return rows;
    } catch (error) {
      console.log('Error retrieving all properties: ', error);
    };

  };


};

const getSimilarProperties = async (currentId, currentLocation, currentPricing) => {


    let queryTwelve = `SELECT * FROM \`similarprops\` WHERE listingId !=$LISTINGID AND location =$LOCATION AND listingId > '8999999' LIMIT 12`;

    let params = { parameters: {
      LISTINGID: `${currentId}`,
      LOCATION: `${currentLocation}`}};

    try {

      var result = await cluster.query(queryTwelve, params);

      let simprops = [];
      let rows = result.rows;
      for (var i = 0; i < rows.length; i++) {
        simprops.push(rows[i].similarprops);
      };

      return simprops;

    } catch (error) {
      console.log('Error retrieving twelve similar properties ', error);
    };


};




module.exports = {
  getPropertyOrProperties,
  getSimilarProperties
};