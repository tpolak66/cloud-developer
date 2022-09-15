/**
 * Fields in a request to update a single TODO item.
 */
export interface UpdateTodoRequest {
  todoid: string
  createdAt: string
  name: string
  dueDate: string
  done: boolean
  attachmentUrl: string
  userId: string
}