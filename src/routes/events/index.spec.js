const initializeDatabase = require('../../utils/initializeDatabase');
const closeDatabase = require('../../utils/closeDatabase');
const app = require('../../app');
const supertest = require('supertest');
const request = supertest(app);

beforeAll(() => {
    return initializeDatabase();
});

afterAll(() => {
    return closeDatabase();
});

describe('GET /', () => {
    test('index - list events', async () => {
        const result = await request.get('/eventos');
        expect(result.status).toBe(200);
    });
});