
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export type Header = {[key: string]: string}
export type HttpClientConfig = AxiosRequestConfig

export interface IHttpClient {
    get: <ResponseType>(url: string, headers: {[key: string]: string}, config: AxiosRequestConfig ) => Promise<AxiosResponse<ResponseType>>
    post: <ResponseType>(url: string , headers: Header, data: any, config: AxiosRequestConfig) =>  Promise<AxiosResponse<ResponseType>>
    put: <ResponseType>(url: string , headers: Header, data: any, config: AxiosRequestConfig) =>  Promise<AxiosResponse<ResponseType>>
    delete: <ResponseType>(url: string , headers: Header, config: AxiosRequestConfig) =>  Promise<AxiosResponse<ResponseType>>
}