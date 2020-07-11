const app = require('../server/index.js');
const supertest = require('supertest');
const request = supertest(app);
import axios from 'axios';

describe('API Endpoints Test Suite', () => {

  it('sends index.html based on unique listing id', async done => {
    const response = await request.get('/1');
    expect(response.status).toBe(200);
    done();
  });

  it('returns twelve similar properties based on the url listing id', async done => {
    const response = await request.get('/listings/1/similarprops');
    expect (response.status).toBe(200);
    expect(response.body).toHaveLength(12);
    expect(response.body[0].location).toEqual('Boise, Idaho');
    done();
  });

  // it('posts metadata to local database', async done => {
  //   const response = await request.post('/similarprops');
  //   expect(response.status).toBe(201);
  //   done();
  // });



});



