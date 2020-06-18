CREATE DATABASE simProps;

CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  assets TEXT[],
  location VARCHAR(50)
  typeOfRoom TEXT,
  totalBeds INT,
  headline VARCHAR(100),
  price INT CHECK(price > 0),
  stars INT CHECK(stars > 0),
  reviews INT,
);