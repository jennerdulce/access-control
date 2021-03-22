'use strict';

require('dotenv').config();
require('@code-fellows/supergoose');
const supertest = require('supertest')
const server = require('../src/server.js')
const mockRequest = supertest(server.app);
process.env.SECRET || 'secret';

let user = {
  username: 'jdulce',
  password: 'password',
  role: 'admin'
}

let shirt = {
  name: 'Shirt',
  color: 'Blue',
  size: 'Medium'
}

let hat = {
  name: 'Hat',
  color: 'Red',
  size: 'OS'
}


describe('v2 ROUTE TESTS', () => {
  it('should add an item to the DB and returns an object with the added item', async () => {
    const responseA = await mockRequest.post('/signup').send(user)

    const responseB = await mockRequest.post('/api/v2/clothes')
     .send(shirt)
     .set('Authorization', `Bearer ${responseA.body.token}`)

    expect(responseB.status).toBe(201);
    expect(responseB.body).toBeDefined();
  })
  
  it('should return a list of :model items', async () => {
    const responseA = await mockRequest.post('/signin')
    .auth('jdulce','password')

    const responseB = await mockRequest.get('/api/v2/clothes')
    .set('Authorization', `Bearer ${responseA.body.token}`)
    expect(responseB.body).toBeDefined();
  })

  it('should return an updated item', async () => {
    const responseA = await mockRequest.post('/signin')
    .auth('jdulce','password')

    const responseB = await mockRequest.get('/api/v2/clothes')
    .set('Authorization', `Bearer ${responseA.body.token}`)
    expect(responseB.body).toBeDefined();

    const responseC = await mockRequest.put(`/api/v2/clothes/${responseB.body[0]._id}`)
    .send(hat)
    .set('Authorization', `Bearer ${responseA.body.token}`)
    expect(responseC.body.name).toBe('Hat');
  })

  it('should return the deleted item', async () => {
    const responseA = await mockRequest.post('/signin')
    .auth('jdulce','password')

    const responseB = await mockRequest.get('/api/v2/clothes')
    .set('Authorization', `Bearer ${responseA.body.token}`)
    expect(responseB.body).toBeDefined();

    const responseC = await mockRequest.delete(`/api/v2/clothes/${responseB.body[0]._id}`)
    .set('Authorization', `Bearer ${responseA.body.token}`)
    expect(responseC.body).toBeDefined();
  })
})
