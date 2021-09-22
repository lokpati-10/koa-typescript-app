import { RouteContext } from "../todo"

export interface IUser {
    registerUser: (user: RouteContext) => Promise<any>
    login: (credential: RouteContext) => Promise<any> 
    // validateToken: (token: string) => Promise<any>
}


export type LoginInfo = {
    userName: string,
    password: string
}

export type Address = {
    addressLines: [string, ...string[]]
    postalCode: string 
    city: string 
    state: string 
    countryCode: string
}

export type UserDetails = {
    firstName: string
    middleName?: string
    email: string 
    lastName?:string 
    primaryContactNumber?: string 
    secondaryContactNumber?: string
    address?: Address
}


export type UserRegisterInfo = LoginInfo & UserDetails