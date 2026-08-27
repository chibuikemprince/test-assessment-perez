const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");
const { createApp } = require("../src/app");
const { readPort } = require("../src/server");

let baseUrl;
let server;

before(async () => {
  server = createApp({
    now: () => new Date("2026-01-02T03:04:05.000Z"),
    createRequestId: () => "test-request-id",
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
});

test("GET /health reports service health", async () => {
  const response = await fetch(`${baseUrl}/health`);

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-request-id"), "test-request-id");
  assert.deepEqual(await response.json(), {
    status: "ok",
    service: "trayway-logistics-backend",
    timestamp: "2026-01-02T03:04:05.000Z",
  });
});

test("GET /api/v1/domain describes a simulated domain", async () => {
  const response = await fetch(`${baseUrl}/api/v1/domain`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.data.simulated, true);
  assert.equal(body.data.productionAccess, false);
  assert.deepEqual(Object.keys(body.data.entities), [
    "customer",
    "restaurant",
    "courier",
    "order",
    "delivery",
  ]);
});

test("unknown routes use the documented error shape", async () => {
  const response = await fetch(`${baseUrl}/missing`);

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), {
    error: {
      code: "NOT_FOUND",
      message: "No route exists for GET /missing.",
    },
  });
});

test("known paths reject unsupported methods", async () => {
  const response = await fetch(`${baseUrl}/health`, { method: "POST" });

  assert.equal(response.status, 405);
  assert.equal((await response.json()).error.code, "METHOD_NOT_ALLOWED");
});

test("readPort validates configuration", () => {
  assert.equal(readPort(undefined), 3000);
  assert.equal(readPort("8080"), 8080);
  assert.throws(() => readPort("invalid"), /PORT must be an integer/);
  assert.throws(() => readPort("70000"), /PORT must be an integer/);
});
