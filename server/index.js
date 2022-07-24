'use strict';

const fastify = require('fastify')();

fastify.register(require('@fastify/websocket'), {
  options: { maxPayload: 1048576 },
});

class Action {
  method;
  payload;
  message;
}

fastify.register(async function (fastify) {
  fastify.get('/', { websocket: true }, (connection, req) => {
    connection.socket.on('message', (message) => {
      message = JSON.parse(message);
      switch (message.method) {
        case 'connection':
          authHanlder(connection.socket, message);
      }
      fastify.websocketServer.clients.forEach(function each(client) {
        if (
          client.readyState === 1 &&
          client.id !== message.user.id
        ) {
          client.send(JSON.stringify(message));
        }
      });
    });
  });
});

fastify.listen({ port: 5000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at: ${address}`);
});

function authHanlder(wsClient, wsData) {
  if (wsData.user && wsData.user.id) {
    wsClient.id = wsData.user.id;
  }
}
