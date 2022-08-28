'use strict';

const fastify = require('fastify')();
const { v4: uuidv4 } = require('uuid');

fastify.register(require('@fastify/websocket'), {
  options: { maxPayload: 1048576 },
});

fastify.register(async function (fastify) {
  fastify.get('/', { websocket: true }, (connection, req) => {
    connection.socket.on('message', (message) => {
      message = JSON.parse(message);
      switch (message.method) {
        case 'UserConnectedAction':
          authHanlder(connection.socket, message);
          break;
      }
      actionHandler(message);
      console.log(message);
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

function actionHandler(message) {
  switch (message.method) {
    case 'UserConnectedAction':
      message.message = {
        id: uuidv4(),
        text: `User ${message.user.name} has connected`,
        showInCanvasActionBar: false,
        showInActivityWindow: true,
        createdAt: new Date().toLocaleTimeString(),
      };

      return message;
    case 'BrushDrawAction':
      message.message = {
        id: uuidv4(),
        text: `User ${message.user.name} is drawing by brush`,
        showInCanvasActionBar: true,
        showInActivityWindow: false,
        createdAt: new Date().toLocaleTimeString(),
      };
      return message;
    case 'RectDrawAction':
      message.message = {
        id: uuidv4(),
        text: `User ${message.user.name} is drawing by rect`,
        showInCanvasActionBar: true,
        showInActivityWindow: false,
        createdAt: new Date().toLocaleTimeString(),
      };
      return message;
  }
}
