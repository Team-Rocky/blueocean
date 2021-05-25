import 'regenerator-runtime/runtime';

const mongoose = require('mongoose');
require('dotenv').config();

const dbFunctions = require('../server/controllers/helpers');

describe('Users: CRUD', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    db = await mongoose.connection;
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('Users');

    const mockUser = { _id: 'some-user-id', name: 'John' };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: 'some-user-id' });
    expect(insertedUser).toEqual(mockUser);
  });

  it('should update a doc in the collection', async () => {
    const users = db.collection('Users');

    const updatedName = { name: 'Walter' };
    await users.findOneAndUpdate(
      { _id: 'some-user-id' },
      { $set: updatedName }
    );

    const insertedUser = await users.findOne({ _id: 'some-user-id' });
    expect(insertedUser.name).toEqual('Walter');
  });

  it('should delete a previous doc in the collection', async () => {
    const users = db.collection('Users');
    await users.deleteMany({ _id: 'some-user-id' });
    const deletedUser = await users.findOne({ _id: 'some-user-id' });
    expect(deletedUser).toEqual(null);
  });
});

describe('Recipes: CRUD', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    db = mongoose.connection;
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should insert a doc into collection', async () => {
    const recipes = db.collection('Recipes');

    const mockUser = { _id: 'some-user-id', name: 'John' };
    await recipes.insertOne(mockUser);

    const insertedUser = await recipes.findOne({ _id: 'some-user-id' });
    expect(insertedUser).toEqual(mockUser);
  });

  it('should update a doc in the collection', async () => {
    const recipes = db.collection('Recipes');

    const updatedName = { name: 'Walter' };
    await recipes.findOneAndUpdate(
      { _id: 'some-user-id' },
      { $set: updatedName }
    );

    const insertedUser = await recipes.findOne({ _id: 'some-user-id' });
    expect(insertedUser.name).toEqual('Walter');
  });

  it('should delete a previous doc in the collection', async () => {
    const recipes = db.collection('Recipes');
    await recipes.deleteMany({ _id: 'some-user-id' });
    const deletedUser = await recipes.findOne({ _id: 'some-user-id' });
    expect(deletedUser).toEqual(null);
  });
});

describe('DB helper functions', () => {
  it('should retrieve a previous user from the collection', async () => {});

  it('should insert a user into the collection', async () => {});

  it('should update a doc in the collection', async () => {});

  it('should delete a previous doc in the collection', async () => {});
});
