import { ParameterizedContext } from 'koa'
import { RouteResponse } from '../../utils'

export type TodoItem = {
  name: string
  createdOn: string
  lastEditedOn: string
  isCompleted: boolean
}

export type RouteContext = ParameterizedContext & {
  params: {
    name: string
  }
  body?: {
    [key: string]: any
  }
  query?: {
    [key: string]: any
  }
  headers?: {
    [key: string]: string
  }
}

export interface ITodo {
  post: (ctx: RouteContext) => RouteResponse<Promise<TodoItem>>
  getTodoLists: () => RouteResponse<Promise<TodoItem[]>>
  getTodListByName: (ctx: RouteContext) => RouteResponse<Promise<TodoItem>>
  completeTodoTask: (ctx: RouteContext) => RouteResponse<Promise<TodoItem>>
  deleteTodo: (ctx: RouteContext) => RouteResponse<Promise<void>>
}
