import {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
  RouteShorthandOptions,
} from 'fastify';
import { Todo } from '../models/todo.js';

const todos: Todo[] = [];

export async function todosRoutes(
  fastify: FastifyInstance,
  options: RouteShorthandOptions
) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return todos;
  });

  fastify.post('/', async (request, reply) => {
    const todo: Todo = {
      id: todos.length + 1,
      title: 'New Todo',
    };

    todos.push(todo);
    reply.code(201);
    return todo;
  });
}
