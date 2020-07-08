// require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const compression = require("compression");
var expressStaticGzip = require("express-static-gzip");

const {
  getPropertyOrProperties,
  getSimilarProperties
} = require('../database/postgres/postgres.js');

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

  let property = await getPropertyOrProperties(req.params.id);
  let propertyInfo = property.rows;
  res.status(200).send(propertyInfo);
  // getPropertyOrProperties(req.params.id, (property) => {
  //   res.status(200).send(property);
  // });
});

// retrieves all similar properties

app.get('/similarprops', async (req, res) => {
  let property = await getPropertyOrProperties(req.params.id);
  let propertyInfo = property.rows;
  res.status(200).send(propertyInfo);
  // getPropertyOrProperties(req.params.id, (property) => {
  //   res.status(200).send(property);
  // });
});

app.get('/listings/:id/similarprops', async (req, res) => {

  let property = await getPropertyOrProperties(req.params.id);
  console.log(property);

  

  let currentLocation = property.rows.location;
  let currentPricing = property.rows.pricing;

  console.log(currentLocation);
  console.log(currentPricing);
  let similarProps = await getSimilarProperties(req.params.id, currentLocation, currentPricing);
  res.status(200).send(similarProps);



  // return property;
  // let currentLocation = property.location;
  // let currentPricing = property.pricing;


  //   getSimilarProperties(req.params.id, currentLocation, currentPricing, (similarProps) => {
  //     res.status(200).send(similarProps);
  //   });



});

// gets 12 similar properties (& assets) from local db based on Listing ID
// app.get('/listings/:id/similarprops', function (req, res, next = () => {}) {


//   axios.get(`http://204.236.167.174/listings/${req.params.id}`)
//     .then(listings => {

//       similarProperties.find(
//         { $and: [
//           {'location': listings.data.location},
//           {'listingId': {$ne: req.params.id} }
//         ]}
//       )
//       .limit(12)
//       .exec((err, listings) => {
//         if (err) {
//           return console.log(err);
//         }
//         res.status(200).json(listings);
//         next();
//       });
//     })
//     .catch(err => {
//       console.error('Could not retrieve & update 12 similar properties!', err);
//     });
// });

//send Listing and Assets metadata to local db
// keeping for now to load carousel- will refactor UI to get only and delete this endpoint
// app.post('/similarprops', function (req, res, next = () => {}) {

//   const requestListings = axios.get(`http://204.236.167.174/listings/metadata/all`);
//   const requestAssets = axios.get(`http://18.144.125.169/listings`);

//   axios.all([requestListings, requestAssets])
//     .then(axios.spread((...responses) => {
//       const requestListingsRes = responses[0];
//       const requestAssetsRes = responses[1];

//       let listingData = requestListingsRes.data;

//       for (let x = 0; x < listingData.length; x++) {
//         let singlePropToInsert = listingData[x];
//         similarProperties.updateOne({'listingId': singlePropToInsert.listingId}, {
//           'listingId': singlePropToInsert.listingId,
//           'headline' : singlePropToInsert.headline,
//           'location' : singlePropToInsert.location,
//           'typeOfRoom': singlePropToInsert.typeOfRoom,
//           'totalBeds': singlePropToInsert.totalBeds,
//           'price': singlePropToInsert.price,
//           'stars': singlePropToInsert.stars,
//           'reviews' : singlePropToInsert.reviews
//         }, {upsert: true})
//           .then(result => {
//             console.log("inserted listing: ", result);
//           })
//           .catch(err => {
//             console.error('Error posting Listing metadata', err);
//           });
//       };


//       getURLS = function(array) {
//         let allAssets = [];

//         for (let i = 0; i < array.length; i++) {
//           let singleAsset = {};
//           singleAsset.listingId = array[i].listingId;
//           let photos = array[i].assets;

//           singleAsset.assets = [];
//           for (let j = 0; j < photos.length; j++) {
//             singleAsset.assets.push(photos[j].url);
//           }

//         allAssets.push(singleAsset);

//         };

//         return allAssets;
//       };

//       let listingAssets = getURLS(requestAssetsRes.data);



//       listingAssets.forEach(assetObj => {
//         similarProperties.updateMany({'listingId': assetObj.listingId}, {$set: {'assets': assetObj.assets}}, {upsert: true})
//           .then(result => {
//             console.log("inserted assets:", result);
//           })
//           .catch(err => {
//             console.error('Error posting Listing metadata', err);
//           });
//       });
//     }))
//     .catch(err => {
//       console.log(err);
//     });

//   res.status(201).end();
//   next();
// });

// creates a single new listing
// POSTMAN TEST PASS
// app.post('/similarprops/:id', (req, res) => {
//   createProperty(req.body, ()=> {
//     res.status(201).send('Property listing created!');
//   })
// });

// // updates a single listing
// // POSTMAN TEST PASS
// app.put('/similarprops/:id', (req, res) => {
//   updateProperty(req.params.id, req.body);
//   res.status(200).send(`Property listing at ${req.params.id} updated`);
// });

// // deletes a single listing
// app.delete('/similarprops/:id', (req, res) => {
//   deleteProperty(req.params.id, () => {
//     res.status(200).send(`Property listing at ${req.params.id} deleted`);
//   });

// });

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});





module.exports = app;



