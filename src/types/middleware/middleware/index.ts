import { RouteContext } from '../../utils'

export interface IMiddleware {
  middleware: (ctx: RouteContext, next: any) => Promise<void> | Promise<{ error: any }>
}
