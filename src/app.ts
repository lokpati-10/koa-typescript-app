
import Koa from 'koa'
import { inBoundRequestLogger } from './middlewares'
import Router from 'koa-router'
const app = new Koa()
import {getAllRoutes} from './controllers/index'



export const createApp = () => {
   const router:Router = getAllRoutes()
   app.use(inBoundRequestLogger)
   app.use(router.routes())
   app.on('error', () => {
        console.log('Ah something went wrong man')
    })

    return app
}



