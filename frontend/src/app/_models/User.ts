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
    address?:String
    googleId?:String
    displayName?:String
    intercontrat?:boolean
    image?:File
    roles?:Role[]
}