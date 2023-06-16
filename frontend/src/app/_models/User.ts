import { Image } from './Image';
import { Message } from './Message';
import { Role } from './Role';
export class User{
    _id?:any
    username?:string
    email?:string
    password?:string
    firstname?:string
    lastname?:string
    birthdate?:Date
    phonenumber?:string
    address?:string
    token?:any
    confirmationCode?:any
    googleId?:String
    displayName?:String
    intercontrat?:boolean
    image?:Image
    roles?:Role[]
    messages?:Message[]
}