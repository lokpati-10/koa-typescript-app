import { RouteResponse } from '../route-utils'

export type Response<T = any> = {
  body: T
  statusCode: Number
}

export interface IResponseBuilder {
  build: () => Response
  withRouteResponse: (data: RouteResponse) => this
  withStatus: (statusCode: Number) => this
}
