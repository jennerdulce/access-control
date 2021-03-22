'use strict';

require('dotenv').config();
require('@code-fellows/supergoose');
const supertest = require('supertest')
const server = require('../src/server.js')
process.env.SECRET || 'secret';

const mockRequest = supertest(server.app);

let user = {
  username: 'jdulce',
  password: 'password'
}

describe('ROUTE TESTS', () => {
  it('should create a new user and send an object with the user and the token to the client', async () => {

    const response = await mockRequest.post('/signup').send(user)
    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
  })

  it('should sign in with basic authentication headers logs in a user and sends an object with the user and the token to the client', async () => {
    const response = await mockRequest.post('/signin')
    .auth('jdulce','password')
    expect(response.body).toBeDefined();
    expect(response.body.token).toBeDefined();
  })
})