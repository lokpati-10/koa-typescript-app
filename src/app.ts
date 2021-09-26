import Koa from 'koa'
import koaBodyParser from 'koa-bodyparser'
import Router from 'koa-router'

import { getAllRoutes as userRoutes } from './controllers/user/index'
import { inBoundRequestLogger } from './middlewares'

const app = new Koa()

export const createApp = () => {
  const router: Router = userRoutes()
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
