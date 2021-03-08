require('dotenv').config();
const initializeDatabase = require('../../utils/initializeDatabase');
const closeDatabase = require('../../utils/closeDatabase');
const app = require('../../app');
const supertest = require('supertest');
const request = supertest(app);
let token = '';

beforeAll(async () => {
    const response = await request
        .post('/users/login')
        .send({
            email: `${process.env.SECRET_EMAIL}`,
            password:  `${process.env.SECRET_PASSWORD}`,
        })
    token = response.body.token;
    await initializeDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('GET /', () => {
    test('index - it must list events', async () => {
        const result = await request.get('/eventos').set('Authorization', `Bearer ${token}`);
        expect(result.status).toBe(200);
    });
    test('show - it must list existing single event', async () => {
        const events = await request.get('/eventos').set('Authorization', `Bearer ${token}`);
        const firstEvent = events.body[0];

        if (firstEvent) {
            const id = firstEvent._id;
            const result = await request.get(`/eventos/${id}`).set('Authorization', `Bearer ${token}`);
            expect(result.status).toBe(200);
        }
    });
    test('show - it must not list unexisting single event', async () => {
        const id = 'unexistingevent';
        const result = await request.get(`/eventos/${id}`).set('Authorization', `Bearer ${token}`);
        expect(result.status).toBe(404);
    });
});