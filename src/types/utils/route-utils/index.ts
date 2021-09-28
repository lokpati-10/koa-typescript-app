import { ParameterizedContext } from 'koa'

export type Data<RouteResponseType = any> = {
  data: RouteResponseType
}

export type Error = { error: any }

// Null is most probably used for the DELETE http verbs
export type RouteResponse<T = any> = Data<T> | Error | undefined

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

export type RouteDefinition = {
  path: string
  method: 'GET' | 'PUT' | 'POST' | 'DELETE'
  route: (ctx: RouteContext) => Promise<any>
}

export interface IRouteBuilder {
  addRoutes: (routes: RouteDefinition[]) => this
  build: () => RouteDefinition[]
}
