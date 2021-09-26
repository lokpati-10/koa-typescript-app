export type Data<RouteResponseType = any> = {
  data: RouteResponseType
}

export type Error = { error: any }

// Null is most probably used for the DELETE http verbs
export type RouteResponse<T = any> = Data<T> | Error | null
