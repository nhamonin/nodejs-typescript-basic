var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const todos = [];
export function todosRoutes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return { todos };
        }));
        fastify.post('/', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { id, title } = request.body;
            const todo = {
                id,
                title,
            };
            todos.push(todo);
            reply.code(201);
            return {
                message: 'Created',
                todo,
            };
        }));
        fastify.put('/:id', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const { title } = request.body;
            const todoIndex = todos.findIndex((todo) => todo.id === id);
            if (todoIndex === -1) {
                reply.code(404);
                return { message: 'Not Found' };
            }
            const todo = {
                id,
                title,
            };
            todos[todoIndex] = todo;
            reply.code(200);
            return todo;
        }));
        fastify.delete('/:id', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const todoIndex = todos.findIndex((todo) => todo.id === id);
            if (todoIndex === -1) {
                reply.code(404);
                return { message: 'Not Found' };
            }
            todos.splice(todoIndex, 1);
            reply.code(200);
            return { message: 'Deleted' };
        }));
    });
}
