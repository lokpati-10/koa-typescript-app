
import Koa from 'koa'
import { inBoundRequestLogger } from './middlewares'
import Router from 'koa-router'
const app = new Koa()
import { getAllRoutes as userRoutes } from './controllers/user/index'
import koaBodyParser from 'koa-bodyparser'



export const createApp = () => {
   const router:Router = userRoutes()
   app.use(koaBodyParser())
   app.use(inBoundRequestLogger)
   app.use(router.routes())
   app.use(router.allowedMethods())
   app.on('error', (error) => {
        console.trace(error)
   })

   return app
}



