import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/users", function () {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "user1",
      },
    });
  });

  it("should can register new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "user1",
      password: "password",
      name: "User 1",
    });
    logger.info(result.body);

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

    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if username already register", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "user1",
      password: "password",
      name: "User 1",
    });
    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("user1");
    expect(result.body.data.name).toBe("User 1");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post("/api/users").send({
      username: "user1",
      password: "password",
      name: "User 1",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
