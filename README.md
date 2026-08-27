# Trayway Logistics JavaScript Backend

This repository is a 12-month, unpaid learning workspace for building a fictional food-delivery logistics backend with JavaScript, Node.js, DynamoDB, and REST APIs.

**All people, orders, locations, and deliveries in this project are simulated. The project has no access to employer or production systems, does not handle real deliveries, and does not promise employment.**

## Prerequisites

- Node.js 20 or newer
- npm 10 or newer

The starter has no third-party runtime dependencies and does not need an AWS account.

## Run the service

```sh
npm start
```

The API listens at `http://localhost:3000`. To use another port, set the `PORT` environment variable before starting it.

For development with automatic restarts:

```sh
npm run dev
```

Run the acceptance tests with:

```sh
npm test
```

## Repository structure

```text
src/
  app.js              HTTP application and route handling
  server.js           Application entry point and port configuration
  domain/delivery.js  Simulated delivery-domain vocabulary
test/
  app.test.js         Starter API acceptance tests
```

## Starter API

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Confirm that the local service is running. |
| `GET` | `/api/v1/domain` | Inspect the simulated entities, statuses, and shared units. |

Example:

```sh
curl http://localhost:3000/api/v1/domain
```

Successful responses are JSON. Errors use `{ "error": { "code": "...", "message": "..." } }`. Every response has an `x-request-id` header for local request tracing.

## Domain and API decisions

These decisions are the transparent starting contract for later tasks:

1. The domain is fictional and every record used by the service must be simulated.
2. The service must never connect to real employer, restaurant, courier, customer, or production systems.
3. REST endpoints are versioned under `/api/v1`; operational endpoints such as `/health` are unversioned.
4. JSON is the request and response representation for the API.
5. The five initial entities are customer, restaurant, courier, order, and delivery.
6. Entity identifiers use descriptive camel-case names such as `deliveryId`, not ambiguous `id` fields.
7. Delivery statuses are `created`, `confirmed`, `preparing`, `ready_for_pickup`, `in_transit`, `delivered`, and `cancelled`.
8. Courier statuses are `offline`, `available`, `assigned`, and `delivering`.
9. Money is represented in Nigerian naira (`NGN`); later tasks should store integer minor units to avoid floating-point errors.
10. Distances are measured in kilometres.
11. Stored and returned timestamps use UTC and ISO 8601 formatting.
12. API failures use a stable error object containing a machine-readable `code` and a clear `message`.
13. Every response includes an `x-request-id` header so a request can be traced during learning exercises.
14. Unsupported methods on known paths return `405`; unknown paths return `404`.
15. DynamoDB is the planned persistence technology, but this bootstrap task makes no database connection and requires no cloud credentials.

## Learning-workspace boundary

This repository provides code exercises and transparent acceptance criteria only. It is not a hiring process, employment relationship, production system, or gateway to private infrastructure. Future tasks should preserve that boundary and should add only simulated fixtures or locally generated test data.
