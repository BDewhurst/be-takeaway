const request = require("supertest");
const app = require('../app');
const db = require("../connection");
const seed = require("../db/seed/seed");
const data = require("../db/test-data/index");


beforeEach(() => {
    return seed(data);
});
afterAll(() => {
    return db.end();
});

describe("GET /api/cuisines", () => {
    test("200 responds with an array of all topics", () => {
        return request(app)
            .get('/api/cuisines')
            .expect(200)
            .then(({ body }) => {
                const cuisines = body;
                expect(cuisines).toHaveLength(13)
                cuisines.forEach((cuisine) => {
                    expect(cuisine).toHaveProperty("slug", expect.any(String))
                   
                })
            })
    })
})