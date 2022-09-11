import { TodosAccess } from '../dataLayer/todosAcess'
// import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
// import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
// import * as createError from 'http-errors'

// TODO: Implement businessLogic

const todosAccess = new TodosAccess();

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
    return todosAccess.getTodosForUser(userId);
}

export function createTodo(createTodoRequest: CreateTodoRequest, userId: string): Promise<TodoItem> {
    return todosAccess.createTodo({
        userId: userId,
        todoId: uuid(),
        createdAt: new Date().getTime().toString(),
        done: false,
        ...createTodoRequest,
    });
}

export function updateTodo(updateTodoRequest: UpdateTodoRequest, todoId: string, userId: string): Promise<UpdateTodoRequest> {
    return todosAccess.updateTodo(updateTodoRequest, todoId, userId);
}

export function deleteTodo(todoId: string, userId: string): Promise<string> {
    return todosAccess.deleteTodo(todoId, userId);
}

export function createAttachmentPresignedUrl(todoId: string,userId: string): Promise<string> {
    return todosAccess.generateUploadUrl(todoId,userId);
}