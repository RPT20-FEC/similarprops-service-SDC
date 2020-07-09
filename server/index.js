// require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const compression = require("compression");
var expressStaticGzip = require("express-static-gzip");

// const {
//   getPropertyOrProperties,
//   getSimilarProperties
// } = require('../database/postgres/postgres.js');

// ESTABLISH COUCHBASE CONNECTION ------------------ //
var couchbase = require('couchbase');

var cluster = new couchbase.Cluster('127.0.0.1', {
  username: 'admin',
  password: 'workwork',
});

var bucket = cluster.bucket('similarprops');
var coll = bucket.defaultCollection();
var N1qlQuery = require('couchbase').N1qlQuery;

// ------------------------------------------------ //

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(compression());

app.use(
  '/',
  expressStaticGzip(path.join(__dirname + '/../client/dist'))
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// retrieves one property by listing id
app.get('/similarprops/:id', async (req, res) => {
  // let property = await getPropertyOrProperties(req.params.id);
  // let propertyInfo = property.rows;
  // res.status(200).send(propertyInfo);

  var listingId = req.params.id;
  var query = `SELECT * FROM \`similarprops\` WHERE listingId =$LISTINGID`;


  try {
    var result = await cluster.query(query, {parameters: {LISTINGID: `${listingId}`}});
    console.log(result.rows);

    let rows = result.rows;
    res.send(rows);
  } catch (error) {
    res.status(404).json({"error": "No match for " + error});
  }
});

// retrieves all similar properties
// app.get('/similarprops', async (req, res) => {
//   let property = await getPropertyOrProperties(req.params.id);
//   let propertyInfo = property.rows;
//   res.status(200).send(propertyInfo);
// });

// app.get('/listings/:id/similarprops', async (req, res) => {

//   let property = await getPropertyOrProperties(req.params.id);
//   console.log(property.rows);

//   let currentLocation = property.rows[0].location;
//   let currentPricing = property.rows[0].pricing;

//   let similarProps = await getSimilarProperties(req.params.id, currentLocation, currentPricing);

//   res.status(200).send(similarProps.rows);


// });


app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});





module.exports = app;



