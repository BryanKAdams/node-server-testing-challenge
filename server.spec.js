const request = require("supertest");
const server = require("./server");
const db = require("./data/dbConfig");

describe("server", function() {
  // it("runs the tests", function() {
  //   expect(process.env.DB_ENV).toBe("testing");
  // });
  describe("test environment", () => {
    it("", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });
  it("runs the server", () => {
    expect(true).toBe(true);
  });

  describe("GET /", function() {
    it("should return 200 OK", function() {
      // make a GET request to /
      return request(server)
        .get("/")
        .then(res => {
          // check that the status code is 200
          expect(res.status).toBe(200);
        });
    });
  });
  describe("GET /api/users", function() {
    it("should return 200 OK when giving Department Electronics", function() {
      return request(server)
        .get("/api/users")
        .send({ department: "Electronics" })
        .then(res => {
          expect(res.status).toBe(200);
          res.body.map(user => {
            expect(user.department).toBe("Electronics");
          });
        });
    });
    it("should return 200 OK when giving NULL Department", function() {
      return request(server)
        .get("/api/users")
        .send({ department: null })
        .then(res => {
          expect(res.status).toBe(200);
          res.body.map(user => {
            expect(user.department).toBe(null);
          });
        });
    });
    it("should return 400 Error Could Not Get Users when not sending user department", function() {
      return request(server)
        .get("/api/users")
        .then(res => {
          expect(res.status).toBe(400);
        });
    });
  });
  describe("POST /register", function() {
 
    it("should return 201 Created when sending a username and password", function() {
      return request(server)
        .post("/api/register")
        .send({
          username: "Test",
          password: "password",
          department: "Electronics"
        })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
    it("should return 500 when no body is sent", function() {
      return request(server)
        .post("/api/register")
        .then(res => {
          expect(res.status).toBe(500);
        });
    });
  });
  describe("POST /api/login", function() {
    it("should return status 200", () => {
      return request(server)
        .post("/api/login")
        .send({
          username: "Test",
          password: "password",
          department: "Electronics"
        })
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });
});
