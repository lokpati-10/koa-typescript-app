import Koa from 'koa'
import koaBodyParser from 'koa-bodyparser'
import Router from 'koa-router'

import { getAllRoutes } from './controllers'
import { inBoundRequestLogger } from './middlewares'
import { RouteDefinition } from './types'
import { routeHandler } from './utils'

const app = new Koa()

const registerRoutes = (routes: RouteDefinition[], router: Router) => {
  routes.forEach((route: RouteDefinition) => {
    router.register(route.path, [route.method], routeHandler(route.route))
  })
}

export const createApp = () => {
  const router: Router = new Router()
  registerRoutes(getAllRoutes, router)
  app.use(koaBodyParser())
  app.use(inBoundRequestLogger)
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.on('error', error => {
    // eslint-disable-next-line no-console
    console.trace(error)
  })

  return app
}
