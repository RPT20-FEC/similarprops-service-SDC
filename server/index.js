// require('dotenv').config();
require('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const compression = require("compression");
var expressStaticGzip = require("express-static-gzip");

const {
  getPropertyOrProperties,
  getSimilarProperties
} = require('../database/couchbase/couchbase.js');


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

// retrieves one property by listing id or headline as endpoint
app.get('/similarprops/:id', async (req, res) => {
  let propertyInfo = await getPropertyOrProperties(req.params.id);

  if (propertyInfo) {
    res.status(200).send(propertyInfo);
  } else {
    res.status(404);
  };

});


// retrieves all similar properties
app.get('/similarprops', async (req, res) => {
  let properties = await getPropertyOrProperties(req.params.id);

  if (properties) {
    res.status(200).send(properties);
  } else {
    res.status(404);
  };

});

// retrieves 12 similar properties
app.get('/listings/:id/similarprops', async (req, res) => {

  let currentProperty = await getPropertyOrProperties(req.params.id);
  // console.log('current property here: ', currentProperty);

  let currentLocation = currentProperty.location;
  let currentPricing = currentProperty.pricing;

  let similarProps = await getSimilarProperties(req.params.id, currentLocation, currentPricing);

  res.status(200).send(similarProps);


});


app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});





module.exports = app;



