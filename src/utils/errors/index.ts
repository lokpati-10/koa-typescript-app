
const constructError = (message: string, statusCode: Number, errorDetails: any) => {
    return {
        error: {
            message,
            statusCode: statusCode,
            timeStamp: {
                value: new Date(),
                zone: new Date().getTimezoneOffset()
            },
            errorDetails, 
        }
    }
}

export const badRequestError = (message: string, details?: any ) =>  constructError(message, 400, details)
export const unauthorizedError = (message: string, details?: any ) => constructError(message, 401, details)
export const internalServerError = (message: string, details?: any) => constructError(message, 500, details)