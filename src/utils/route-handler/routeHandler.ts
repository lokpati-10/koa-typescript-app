import { RouterContext } from "koa-router"

export function routeHandler(route: Function) {
    return async (ctx: RouterContext, next: any) => {
        try {
            const res = await route(ctx)
            ctx.response.status = 200
            ctx.response.body = {
                data: res
            }
        } catch (error) {
            ctx.response.status = 400
            ctx.response.body = {
                reason: error.message,
                dateTime: new Date()
            }
        }

        return next()
    }
}