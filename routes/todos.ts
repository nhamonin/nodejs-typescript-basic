import {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
  RouteShorthandOptions,
} from 'fastify';

import { Todo } from '../models/todo.js';

interface RouteParams {
  id: string;
}

const todos: Todo[] = [];

export async function todosRoutes(
  fastify: FastifyInstance,
  options: RouteShorthandOptions
) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return { todos };
  });

  fastify.post('/', async (request, reply) => {
    const { id, title } = request.body as { id: number; title: string };
    const todo: Todo = {
      id,
      title,
    };

    todos.push(todo);
    reply.code(201);

    return {
      message: 'Created',
      todo,
    };
  });

  fastify.put(
    '/:id',
    async (
      request: FastifyRequest<{ Params: RouteParams }>,
      reply: FastifyReply
    ) => {
      const id = Number(request.params.id);
      const { title } = request.body as { title: string };
      const todoIndex = todos.findIndex((todo) => todo.id === id);

      if (todoIndex === -1) {
        reply.code(404);
        return { message: 'Not Found' };
      }

      const todo: Todo = {
        id,
        title,
      };

      todos[todoIndex] = todo;
      reply.code(200);

      return todo;
    }
  );

  fastify.delete(
    '/:id',
    async (
      request: FastifyRequest<{ Params: RouteParams }>,
      reply: FastifyReply
    ) => {
      const id = Number(request.params.id);
      const todoIndex = todos.findIndex((todo) => todo.id === id);

      if (todoIndex === -1) {
        reply.code(404);
        return { message: 'Not Found' };
      }

      todos.splice(todoIndex, 1);
      reply.code(200);

      return { message: 'Deleted' };
    }
  );
}
