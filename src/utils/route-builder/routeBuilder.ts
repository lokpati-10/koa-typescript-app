import { IRouteBuilder, RouteDefinition } from '../../types'

export class RouteBuilder implements IRouteBuilder {
  private routes: RouteDefinition[] = []

  constructor() {}

  addRoutes = (routes: RouteDefinition[]) => {
    this.routes = [...this.routes, ...routes]
    return this
  }

  build = () => {
    return this.routes
  }
}
