import { createWinstonLogger } from '../logger'
import { ParameterizedContext } from 'koa'
import { LogLevel } from '../types'



export async function inBoundRequestLogger(_ctx: ParameterizedContext, next: any) {
    const startTimeStamp = Date.now()
    await next()
    const finishTimeStamp = Date.now()
    const duration = finishTimeStamp - startTimeStamp
    createWinstonLogger().log({
        level: LogLevel.Info,
        startTimeStamp,
        duration,
        routeName: _ctx.url
    })
}