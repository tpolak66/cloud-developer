/**
 * Fields in a request to create a single TODO item.
 */
export interface CreateTodoRequest {
  todoid: string
  createdAt: string
  name: string
  dueDate: string
  done: boolean
  attachmentUrl: string
  userId: string
}
