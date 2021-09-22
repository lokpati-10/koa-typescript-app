
import { IResponseBuilder , RouteResponse } from '../../types'

export class ResponseBuilder implements IResponseBuilder {
    protected data: RouteResponse | undefined
    protected status: Number = 200

    withRouteResponse = <T>(data: RouteResponse<T>) => {
        this.data = data
        return this
    }

    withStatus = (status: Number) => {
        this.status = status
        return this
    }

    build = () => {
        
        return {
            body: this.data,
            status: this.status
        }
    }
}