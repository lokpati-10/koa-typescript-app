import { RouterContext } from 'koa-router'

export function routeHandler(route: Function) {
  return async (ctx: RouterContext, next: any) => {
    try {
      const res = await route(ctx)
      ctx.response.status = res.error ? res.error.statusCode : res.statusCode
      ctx.response.body = res.error ? { error: res.error } : res.body
    } catch (error) {
      ctx.response.status = 500
      ctx.response.body = {
        reason: (error as any).message,
        dateTime: new Date()
      }
    }

    return next()
  }
}
