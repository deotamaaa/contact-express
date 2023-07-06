import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestUser, removeTestUser } from "./test-util.js";
import { func } from "joi";

describe("POST /api/users", function () {
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can register new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "user1",
      password: "password",
      name: "User 1",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("user1");
    expect(result.body.data.name).toBe("User 1");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should reject if empty", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if username already register", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "user1",
      password: "password",
      name: "User 1",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("user1");
    expect(result.body.data.name).toBe("User 1");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post("/api/users").send({
      username: "user1",
      password: "password",
      name: "User 1",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/users/login", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can login", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "user1",
      password: "password",
    });
    logger.info("=====================");
    logger.info(result.status);
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("token");
  });

  it("should reject login if request invalid", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "",
      password: "",
    });
    logger.info("=====================");
    logger.info(result.status);
    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject login if username/password invalid", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "user12",
      password: "password",
    });
    logger.info("=====================");
    logger.info(result.status);
    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/users/current", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can get current user", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "token");
    logger.info("=====================");
    logger.info(result.status);
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("user1");
    expect(result.body.data.name).toBe("Test");
  });
});
