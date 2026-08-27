const { createApp } = require("./app");

function readPort(value) {
  const port = Number(value ?? 3000);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535.");
  }

  return port;
}

function startServer() {
  const port = readPort(process.env.PORT);
  const server = createApp();

  server.listen(port, () => {
    console.log(`Trayway Logistics API listening on http://localhost:${port}`);
  });

  return server;
}

if (require.main === module) {
  startServer();
}

module.exports = { readPort, startServer };
