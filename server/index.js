require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const compression = require("compression");
var expressStaticGzip = require("express-static-gzip");

const similarProperties = require('../database/similarProperties.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(compression());

app.use(
  '/',
  expressStaticGzip(path.join(__dirname + '/../client/dist'))
);

// app.use(express.static(__dirname + '/../client/dist'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// gets module
app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});


//send Listing and Assets metadata to local db
app.post('/similarprops', function (req, res, next = () => {}) {

  const requestListings = axios.get(`http://204.236.167.174/listings/metadata/all`);
  const requestAssets = axios.get(`http://18.144.125.169/listings`);

  axios.all([requestListings, requestAssets])
    .then(axios.spread((...responses) => {
      const requestListingsRes = responses[0];
      const requestAssetsRes = responses[1];

      let listingData = requestListingsRes.data;

      for (let x = 0; x < listingData.length; x++) {
        let singlePropToInsert = listingData[x];
        similarProperties.updateOne({'listingId': singlePropToInsert.listingId}, {
          'listingId': singlePropToInsert.listingId,
          'headline' : singlePropToInsert.headline,
          'location' : singlePropToInsert.location,
          'typeOfRoom': singlePropToInsert.typeOfRoom,
          'totalBeds': singlePropToInsert.totalBeds,
          'price': singlePropToInsert.price,
          'stars': singlePropToInsert.stars,
          'reviews' : singlePropToInsert.reviews
        }, {upsert: true})
          .then(result => {
            console.log("inserted listing: ", result);
          })
          .catch(err => {
            console.error('Error posting Listing metadata', err);
          });
      };


      getURLS = function(array) {
        let allAssets = [];

        for (let i = 0; i < array.length; i++) {
          let singleAsset = {};
          singleAsset.listingId = array[i].listingId;
          let photos = array[i].assets;

          singleAsset.assets = [];
          for (let j = 0; j < photos.length; j++) {
            singleAsset.assets.push(photos[j].url);
          }

        allAssets.push(singleAsset);

        };

        return allAssets;
      };

      let listingAssets = getURLS(requestAssetsRes.data);



      listingAssets.forEach(assetObj => {
        similarProperties.updateMany({'listingId': assetObj.listingId}, {$set: {'assets': assetObj.assets}}, {upsert: true})
          .then(result => {
            console.log("inserted assets:", result);
          })
          .catch(err => {
            console.error('Error posting Listing metadata', err);
          });
      });
    }))
    .catch(err => {
      console.log(err);
    });

  res.status(201).end();
  next();
});

// gets 12 similar properties (& assets) from local db based on Listing ID

app.get('/listings/:id/similarprops', function (req, res, next = () => {}) {


  axios.get(`http://204.236.167.174/listings/${req.params.id}`)
    .then(listings => {

      similarProperties.find(
        { $and: [
          {'location': listings.data.location},
          {'listingId': {$ne: req.params.id} }
        ]}
      )
      .limit(12)
      .exec((err, listings) => {
        if (err) {
          return console.log(err);
        }
        res.status(200).json(listings);
        next();
      });
    })
    .catch(err => {
      console.error('Could not retrieve & update 12 similar properties!', err);
    });
});



module.exports = app;



