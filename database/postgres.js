const pool = require('./pool.js');

//WIP FILE PATH
// const seedDB = (file) => {
//   pool
//     .query(`\COPY properties FROM '/Users/minhngo/Desktop/SDC/similarprops-service-sdc/seedData${file++}.csv' DELIMITER ',' CSV HEADER;`)
//     .then(console.log('Successfully seeded SQL database.'))
//     .catch(console.log(err))

// };


const getPropertyOrProperties = (id, cb) => {

  if (id) {
    // QUERIES BY ID DEPENDENT ON HEADLINE OR NUMERICAL LISTING ID
    let headlineAsID = Number.isNaN(parseInt(id));

    if (headlineAsID) {
      pool
        .query('SELECT * FROM properties WHERE headline = $1 LIMIT 12', [id])
        .then(results => cb(results.rows))
        .catch(console.log(err))
    } else {
      pool
      .query('SELECT * FROM properties WHERE id = $1', [id])
      .then(results => cb(results.rows))
      .catch(console.log(err))
    };

  } else {
    // QUERIES FOR ALL PROPERTIES
    pool
      .query('SELECT * FROM properties')
      .then(results => cb(results.rows))
      .catch(console.log(err))
  };

};

// NEEDS REFACTORING
const getSimilarProperties = (location, price, cb) => {

  pool
    .query('SELECT * FROM properties WHERE location = $1 LIMIT 12') // implement last 10% bias, filter by price range
    .then(results => cb(results.rows))
    .catch(console.log(err))
};

const createProperty = (propertyData, cb) => {

  const {
    id,
    assets,
    location,
    typeOfRoom,
    totalBeds,
    headline,
    price,
    stars,
    reviews
  } = propertyData;

  pool
    .query(
      'INSERT INTO properties (id, assets, location, typeOfRoom, totalBeds, headline, price, stars, reviews) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING * ;',
      [id, assets, location, typeOfRoom, totalBeds, headline, price, stars, reviews])
    .then(results => cb(results.rows))
    .catch(console.log(err))
};

const updateProperty = (id, data) => {

  const {
    assets,
    location,
    typeOfRoom,
    totalBeds,
    headline,
    price,
    stars,
    reviews
  } = data;

  pool
    .query(
      'UPDATE properties SET assets = $1, location = $2, typeOfRoom = $3, totalBeds = $4, headline = $5, price = $6, stars = $7, review = $8 WHERE id = $9 RETURNING * ; ',
      [assets, location, typeOfRoom, totalBeds, headline, price, stars, reviews])
    .then(results => cb(results.rows))
    .catch(console.log(err))

};

const deleteProperty = (id, cb) => {

  if (headlineAsID) {
    pool
      .query('DELETE FROM properties WHERE headline = $1', [id])
      .then(results => cb(results.rows))
      .catch(console.log(err))
  } else {
    pool
      .query('DELETE FROM properties WHERE id = $1', [id])
      .then(results => cb(results.rows))
      .catch(console.log(err))
  }
};


module.exports = {
  getPropertyOrProperties,
  getSimilarProperties,
  createProperty,
  updateProperty,
  deleteProperty
};