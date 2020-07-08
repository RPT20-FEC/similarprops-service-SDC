const pool = require('./pool.js');


const getPropertyOrProperties = (id) => {

  if (id) {
    // QUERIES BY ID DEPENDENT ON HEADLINE OR NUMERICAL LISTING ID
    let headlineAsID = Number.isNaN(parseInt(id));

    if (headlineAsID) {
      return pool
        .query('SELECT * FROM properties WHERE headline = $1', [id])
        // .then(results => cb(results.rows))
        .catch(console.log(err))
    } else {
      return pool
      .query('SELECT * FROM properties WHERE id = $1', [id])
      // .then(results => cb(results.rows))
      .catch(err => console.log(err))
    };

  } else {
    // QUERIES FOR ALL PROPERTIES
    return pool
      .query('SELECT * FROM properties')
      // .then(results => cb(results.rows))
      .catch(console.log(err))
  };

};

// GETS 12 SIMILAR PROPERTIES BY LOCATION AND PRICE RANGE, BIAS TOWARDS 10% OF DATA SET
const getSimilarProperties = (currentId, currentLocation, currentPricing) => {

  return pool
    .query(`SELECT * FROM properties WHERE id != ${currentId} AND location = ${currentLocation} AND pricing BETWEEN (${currentPricing} - 25) AND (${currentPricing} + 25) AND id > 8999999 LIMIT 12`)
    // .then(results => cb(results.rows))
    .catch(err=> console.log(err))
};

const createProperty = (propertyData, cb) => {

  const columns = Object.keys(propertyData).map(key => `${key}`);
  const values = Object.values(propertyData).map(value => `${value}`);

  pool
    .query(
      'INSERT INTO listings (${columns}) VALUES (${values}) RETURNING *')
    .then(results => cb(results.rows[0]))
    .catch(err => console.log(err))
};

const updateProperty = (id, propertyData) => {

  const columns = Object.keys(propertyData).map(key => `${key}`);
  const values = Object.values(propertyData).map(value => `${value}`);

  let updateByIDType = Number.isNaN(parseInt(id)) ? `UPDATE properties SET (${columns}) = ROW(${values}) WHERE headline = '${id}' RETURNING *` : `UPDATE listings SET (${cols}) = ROW(${values}) WHERE id NOT IN $3 ${id} RETURNING *`;

  pool
    .query(updateByIDType)
    .then(results => cb(results.rows))
    .catch(err => console.log(err))

};

const deleteProperty = (id, cb) => {

  let headlineAsID = Number.isNaN(parseInt(id));
  if (headlineAsID) {
    pool
      .query('DELETE FROM properties WHERE headline = $1', [id])
      .then(results => cb(results.rows))
      .catch(console.log(err))
  } else {
    pool
      .query('DELETE FROM properties WHERE id = $1', [id])
      .then(results => cb(results.rows))
      .catch(err => console.log(err))
  }
};


module.exports = {
  getPropertyOrProperties,
  getSimilarProperties,
  createProperty,
  updateProperty,
  deleteProperty
};