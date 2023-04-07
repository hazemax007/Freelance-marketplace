import { Role } from './Role';
export class User{
    id:any
    username:string
    email:string
    password:string
    firstname:string
    lastname:string
    birthdate:Date
    phonenumber:string
    address:string
    image?:string
    roles:Role[]
}