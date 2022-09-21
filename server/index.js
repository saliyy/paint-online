'use strict';

const fastify = require('fastify')();
const fastifyEnv = require('@fastify/env')
require('dotenv').config();
const actionHandler = require('./actions/actionHandler')
const authHandler = require('./actions/authHandler')

const schema = {
  type: 'object',
  required: ['PORT', 'HOST'],
  properties: {
    PORT: {
      type: 'number'
    },
    HOST: {
      type: 'string'
    }
  }
}
const options = {
  confKey: 'config',
  schema: schema,
  data: process.env
}

const initialize = async() => {
  await fastify.register(fastifyEnv, options)


  await fastify.register(require('@fastify/websocket'), {
    options: { maxPayload: 1048576 },
  });

  await fastify.register(async function (fastify) {
    fastify.get('/test', (req, res) => {
      return res.send('Hey from container!');
    });

    fastify.get('/', { websocket: true }, (connection, req) => {
      connection.socket.on('message', (message) => {
        message = JSON.parse(message);
        switch (message.method) {
          case 'UserConnectedAction':
            authHandler(connection.socket, message);
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

          if (
              client.id === message.user.id &&
              message.method === 'ChatMessageAction'
          ) {
            client.send(JSON.stringify(message));
          }
        });
      });
    });
  });

  await fastify.listen(fastify.config.PORT, fastify.config.HOST, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at: ${address}`);
  });
}

(async () => {
  await initialize()
})()



