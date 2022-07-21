'use strict';
const fastify = require('fastify')();

fastify.register(require('@fastify/websocket'), {
  options: { maxPayload: 1048576 },
});

fastify.register(async function (fastify) {
  fastify.get(
    '/',
    { websocket: true },
    (connection /* SocketStream */, req /* FastifyRequest */) => {
      connection.socket.on('message', (message) => {
        message = JSON.parse(message);
        connection.socket.send('hi from server');
      });
    }
  );
});

fastify.listen({ port: 5000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at: ${address}`);
});
