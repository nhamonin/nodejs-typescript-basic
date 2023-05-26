import fastify from 'fastify';

import { todosRoutes } from './routes/todos.js';

const server = fastify();

server.register(todosRoutes, { prefix: '/todos' });

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
