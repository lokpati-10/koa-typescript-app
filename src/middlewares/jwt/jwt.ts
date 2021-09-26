import { IMiddleware, RouteContext } from '../../types'
import jwt from 'jsonwebtoken'

export class Jwt implements IMiddleware {
  public static instance: Jwt | undefined

  public static getInstance() {
    if (this.instance !== undefined) return this.instance
    this.instance = new Jwt()
    return this.instance
  }

  constructor() {}

  private extractToken = (token: string): string | undefined => {
    const tokenHeader = token.split(' ')
    if (tokenHeader.length === 2 && token[0] === 'bearer') {
      return token[1]
    }
    return undefined
  }

  verifyToken = async (ctx: RouteContext, next: any) => {
    const auth = ctx.req.headers.authorization
    if (!auth) {
      return Promise.resolve({
        error: {
          message: 'Invalid Token'
        }
      })
    }

    const jwtToken = this.extractToken(auth)
    if (jwtToken) {
      jwt.verify(jwtToken, 'superCoolSecret', error => {
        if (error) {
          ctx.state.identity = {
            authenticated: false
          }
        }
        next()
      })
    }

    return Promise.resolve({
      error: {
        message: 'hmm you are wrong man'
      }
    })
  }

  middleware = this.verifyToken
}
