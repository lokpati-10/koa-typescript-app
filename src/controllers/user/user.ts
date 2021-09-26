import bcryptjs from 'bcryptjs'
import Router from 'koa-router'

import { userSignInModel } from '../../models'
import { createJwtSign, JwtSign } from '../../routes'
import { IUser, RouteContext } from '../../types'
import {
  badRequestError,
  createResponseBuilder,
  internalServerError,
  routeHandler,
  unauthorizedError
} from '../../utils'

export class User implements IUser {
  public static instance: IUser | undefined

  public static getInstance() {
    if (this.instance !== undefined) return this.instance
    this.instance = new User(createJwtSign())
    return this.instance
  }

  constructor(private readonly JwtSign: JwtSign) {}

  registerUser = async (ctx: RouteContext) => {
    const body = ctx.request.body as any
    try {
      const record = await userSignInModel.findOne({ userName: body.userName })

      if (record) {
        return unauthorizedError('userName has already been taken')
      }

      const saltPassword = await bcryptjs.hash(body.password, 10)

      const payload = {
        ...body,
        password: saltPassword
      }

      await userSignInModel.create(payload)

      return createResponseBuilder()
        .withRouteResponse({
          data: {
            ...body
          }
        })
        .withStatus(201)
        .build()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.trace(error)
      return internalServerError((error as any).message)
    }
  }

  login = async (ctx: RouteContext) => {
    const { userName, password } = ctx.request.body
    if (userName === undefined || password === undefined) {
      return unauthorizedError('invalid user')
    }

    const record = await userSignInModel.findOne({ userName })

    if (!record) {
      return badRequestError('user does not exist pleas signup first')
    }

    const isValidPassword = await bcryptjs.compare(password, record.password)

    if (!isValidPassword) return unauthorizedError('password mismatch')

    const token = await this.JwtSign.signUser(ctx)

    return createResponseBuilder()
      .withRouteResponse({
        data: {
          user: {
            userName: record.userName,
            token
          }
        }
      })
      .withStatus(200)
      .build()
  }
}

const instance = User.getInstance()

const router = new Router()

type methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

const routes: { url: string; methods: methods[]; route: Function }[] = [
  {
    url: '/api/v1/user/login',
    methods: ['POST'],
    route: instance.login
  },
  {
    url: '/api/v1/user/register',
    methods: ['POST'],
    route: instance.registerUser
  }
  // {
  //     url: '/api/v1/user/token',
  //     methods: ['POST'],
  //     route: todoInstance.validateToken
  // }
]

for (const item of routes) {
  const { url, methods, route } = item
  router.register(url, methods, routeHandler(route))
}

export const getAllRoutes = (): Router => router
