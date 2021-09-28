import { RouteDefinition } from '../types'
import { routes as userRoutes } from './user'

export const getAllRoutes: RouteDefinition[] = [...userRoutes]
