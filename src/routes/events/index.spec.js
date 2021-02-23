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
    test('index - it must list events', async () => {
        const result = await request.get('/eventos');
        expect(result.status).toBe(200);
    });
    test('show - it must list existing single event', async () => {
        const id = '6034425fab22702313072a1f';
        const result = await request.get(`/eventos/${id}`);
        expect(result.status).toBe(200);
    });
    test('show - it must not list unexisting single event', (done) => {
        const id = 'unexistingevent';
        request.get(`/eventos/${id}`)
            .expect(200)
            .end(function (err, res) {
                expect(res.body.error).toBe('Not Found');
                done();
            });
    });
});