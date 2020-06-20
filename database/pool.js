const path = require('path');
const {Pool} = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'simProps',
  password: '',
  port: 5432,
})

module.exports = pool;