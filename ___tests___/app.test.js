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
    test("200 responds with an array of all cuisines", () => {
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
describe("GET /api/restaurants", () => {
    test("200 responds with an array of all restaurants", () => {
        return request(app)
            .get('/api/restaurants')
            .expect(200)
            .then(({ body }) => {
                const restaurants = body;
                expect(restaurants).toHaveLength(5)
                restaurants.forEach((restaurant) => {
                    expect(restaurant).toHaveProperty("address", expect.any(String))
                    expect(restaurant).toHaveProperty("cuisine", expect.any(String))
                    expect(restaurant).toHaveProperty("name", expect.any(String))
                    expect(restaurant).toHaveProperty("rating", expect.any(String))
                    expect(restaurant).toHaveProperty("restaurant_id", expect.any(Number))
                    expect(restaurant).toHaveProperty("article_img_url");
                })
            })
    })
})
describe("GET /api/restaurants/:restaurantId", () => {
    test("200 responds with an array of all restaurants", () => {
        return request(app)
            .get('/api/restaurants/3')
            .expect(200)
            .then(({ body }) => {
                const restaurants = body;
                expect(restaurants).toHaveLength(1)
                restaurants.forEach((restaurant) => {
                    expect(restaurant).toHaveProperty("address", expect.any(String))
                    expect(restaurant).toHaveProperty("cuisine", expect.any(String))
                    expect(restaurant).toHaveProperty("name", expect.any(String))
                    expect(restaurant).toHaveProperty("rating", expect.any(String))
                    expect(restaurant).toHaveProperty("restaurant_id", expect.any(Number))
                    expect(restaurant).toHaveProperty("article_img_url");
                })
            })
    })
})

describe("GET /api/items/:restaurantId", () => {
    test("200 responds with an array of all restaurants", () => {
        return request(app)
            .get('/api/items/3')
            .expect(200)
            .then(({ body }) => {
                const items = body;
                expect(items).toHaveLength(4)
                items.forEach((item) => {
                    expect(item).toHaveProperty("item_id", expect.any(Number))
                    expect(item).toHaveProperty("description", expect.any(String))
                    expect(item).toHaveProperty("name", expect.any(String))
                    expect(item).toHaveProperty("price", expect.any(String))
                    expect(item).toHaveProperty("restaurant_id", expect.any(Number))
                  
                })
            })
    })
})