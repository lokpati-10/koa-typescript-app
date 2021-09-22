
import {  RouteContext } from "../../types";
import jwt from 'jsonwebtoken'

export class JwtSign {
    public static instance: JwtSign | undefined 

    public static getInstance(){
        if(this.instance !== undefined) return this.instance
        this.instance = new JwtSign()
        return this.instance
    }

    constructor(){}

    signUser = async (ctx: RouteContext): Promise<string> => {
        const body = ctx.request.body
        try {
           const token =  jwt.sign(
                {
                    username: body.userName
                },
                'superCoolToken',
                {
                    issuer: 'app',
                    algorithm: 'HS256',
                    expiresIn: '1h'
                } 
            );
            return token
        } catch (error) {
            console.trace(error)
            throw new Error('catch me')
        }
    }
}

export const createJwtSign = () => JwtSign.getInstance()