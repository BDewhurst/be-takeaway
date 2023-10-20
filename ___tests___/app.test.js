const request = require("supertest");
const app = require('../app');
const db = require("../db/connection");
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
describe("GET /api/users/:username", () => {
    test("200 responds with an array of all restaurants", () => {
        return request(app)
            .get('/api/users/rogersop')
            .expect(200)
            .then(({ body }) => {
                const user = body;
                expect(user).toHaveLength(1)
                user.forEach((user) => {
                    expect(user).toHaveProperty("avatar_url", expect.any(String))
                    expect(user).toHaveProperty("username", expect.any(String))
                    expect(user).toHaveProperty("name", expect.any(String))
                  
                })
            })
    })
})
describe("patch /api/restaurant/:restaurantId", () => {
    test("200 responds with an array of all restaurants", () => {
        const update = { "inc_vote": 5 }
        const update2 = {"inc_vote": 3 }
        return request(app)
        
            .patch('/api/restaurants/2')
            .send(update)
            .expect(200)
            .then(({ body }) => {
                const restaurant = body;
                expect(restaurant).toHaveLength(1)
                restaurant.forEach((newRestaurant) => {
                    expect(newRestaurant).toHaveProperty("restaurant_id", expect.any(Number))
                    expect(newRestaurant).toHaveProperty("address", expect.any(String))
                    expect(newRestaurant).toHaveProperty("rating", expect.any(String))
                    expect(newRestaurant).toHaveProperty("cuisine", expect.any(String))
                    expect(newRestaurant.rating).toEqual('5.00')
                    expect(newRestaurant.amount_of_votes).toEqual(1)
                  
                })
                return request(app)
                .patch('/api/restaurants/2')
            .send(update2)
            .expect(200)
            .then(({ body }) => {
                const restaurant = body;
                expect(restaurant).toHaveLength(1)
                restaurant.forEach((newRestaurant) => {
                    expect(newRestaurant).toHaveProperty("restaurant_id", expect.any(Number))
                    expect(newRestaurant).toHaveProperty("address", expect.any(String))
                    expect(newRestaurant).toHaveProperty("rating", expect.any(String))
                    expect(newRestaurant).toHaveProperty("cuisine", expect.any(String))
                    expect(newRestaurant.rating).toEqual('4.00')
                    expect(newRestaurant.amount_of_votes).toEqual(2)
                  
                })
            })
        })
    })
})
describe("GET /api/restaurants/:restaurantId", () => {
    test("200 responds with an array of all restaurants", () => {
        return request(app)
            .get('/api/comments/3')
            .expect(200)
            .then(({ body }) => {
                const comments = body;
                expect(comments).toHaveLength(1)
                comments.forEach((comment) => {
                    expect(comment).toHaveProperty("author", expect.any(String))
                    expect(comment).toHaveProperty("created_at", expect.any(String))
                    expect(comment).toHaveProperty("description", expect.any(String))
                    expect(comment).toHaveProperty("votes", expect.any(Number))
                    expect(comment).toHaveProperty("restaurant_id", expect.any(Number))
                    expect(comment).toHaveProperty("comment_id", expect.any(Number));
                })
            })
    })
})