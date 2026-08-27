const DELIVERY_STATUSES = Object.freeze([
  "created",
  "confirmed",
  "preparing",
  "ready_for_pickup",
  "in_transit",
  "delivered",
  "cancelled",
]);

const COURIER_STATUSES = Object.freeze([
  "offline",
  "available",
  "assigned",
  "delivering",
]);

const domain = Object.freeze({
  name: "Trayway simulated delivery domain",
  simulated: true,
  productionAccess: false,
  currency: "NGN",
  distanceUnit: "kilometres",
  timeStandard: "UTC",
  entities: Object.freeze({
    customer: Object.freeze({
      description: "A fictional person who places an order.",
      identifier: "customerId",
    }),
    restaurant: Object.freeze({
      description: "A fictional food preparation and pickup location.",
      identifier: "restaurantId",
    }),
    courier: Object.freeze({
      description: "A simulated delivery worker assigned to a delivery.",
      identifier: "courierId",
      statuses: COURIER_STATUSES,
    }),
    order: Object.freeze({
      description: "The requested food items and their simulated price.",
      identifier: "orderId",
    }),
    delivery: Object.freeze({
      description: "The logistics job connecting an order, pickup, and drop-off.",
      identifier: "deliveryId",
      statuses: DELIVERY_STATUSES,
    }),
  }),
});

module.exports = { COURIER_STATUSES, DELIVERY_STATUSES, domain };
