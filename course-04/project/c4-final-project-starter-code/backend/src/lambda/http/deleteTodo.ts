import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteTodo } from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'
const logger = createLogger('TodosAccess')
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    // TODO: Remove a TODO item by id

  const userId = getUserId(event);
  const todo = await deleteTodo(todoId, userId);
  logger.info(todo)
    // if(!todo){
    //   return {
    //     statusCode: 404,
    //     headers:{
    //       'Access-Control-Allow-Origin':'*'
    //     },
    //     body: JSON.stringify({message: 'Todo not found'})
    //   }
    // }
  
    return {
      statusCode: 204,
      headers:{
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify({})
  }
}
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )