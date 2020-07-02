-- CREATE DATABASE simProps;

CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  assets TEXT[],
  location VARCHAR(50),
  typeOfRoom TEXT,
  totalBeds INT,
  headline VARCHAR(100) UNIQUE,
  pricing INT CHECK(pricing > 0),
  stars DECIMAL CHECK(stars > 0),
  reviews DECIMAL
);