const app = require('../server/index.js');
const supertest = require('supertest');
const request = supertest(app);
import axios from 'axios';

describe('API Endpoints Test Suite', () => {

  it('sends index.html based on unique listing id', async done => {
    const response = await request.get('/1006');
    expect(response.status).toBe(200);
    done();
  });

  it('returns twelve similar properties based on the url listing id', async done => {
    const response = await request.get('/listings/1006/similarprops');
    expect (response.status).toBe(200);
    expect(response.body).toHaveLength(11);
    expect(response.body[0].location).toEqual('Los Angeles, California');
    done();
  });

  it('posts metadata to local database', async done => {
    const response = await request.post('/similarprops');
    expect(response.status).toBe(201);
    done();
  });



});



