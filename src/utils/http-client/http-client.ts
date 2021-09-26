import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Header, HttpClientConfig, IHttpClient } from '../../types'

export class HttpClient implements IHttpClient {
  public static instance: IHttpClient | undefined

  public static getInstance() {
    if (this.instance !== undefined) return this.instance
    const axiosInstance = axios.create({
      timeout: 2 * 1000
    })

    this.instance = new HttpClient(axiosInstance)
    return this.instance
  }

  constructor(private readonly axiosInstance: AxiosInstance) {}

  get = async <ResponseType>(url: string, headers: { [key: string]: string }, config: AxiosRequestConfig) => {
    return this.makeNetworkCall<ResponseType>(url, {
      ...config,
      headers,
      url,
      method: 'GET'
    })
  }

  post = async <ResponseType>(url: string, headers: Header, data: any, config: AxiosRequestConfig) => {
    return this.makeNetworkCall<ResponseType>(url, {
      ...config,
      headers,
      data,
      url,
      method: 'POST'
    })
  }

  put = async <ResponseType>(url: string, headers: Header, data: any, config: AxiosRequestConfig) => {
    return this.makeNetworkCall<ResponseType>(url, {
      ...config,
      headers,
      data,
      url,
      method: 'PUT'
    })
  }

  delete = async <ResponseType = void>(url: string, headers: { [key: string]: string }, config: AxiosRequestConfig) => {
    return this.makeNetworkCall<ResponseType>(url, {
      ...config,
      headers,
      url,
      method: 'DELETE'
    })
  }

  private readonly makeNetworkCall = async <T>(url: string, config: HttpClientConfig): Promise<AxiosResponse<T>> => {
    try {
      const resp = await this.axiosInstance.request<T>({
        url,
        ...config
      })
      return resp
    } catch (e) {
      throw new Error(`something went wrong - message: ${(e as any).message} - stack: ${(e as any)?.stack}`)
    }
  }
}

export const creatHttpClient = () => HttpClient.getInstance()
