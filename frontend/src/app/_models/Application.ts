import { Mission } from "./Mission"
import { User } from "./User"

export class Application{
    _id?:any
    name?:string
    description?:string
    startDate?:Date
    resume?:any
    mission?:Mission
    user?:User
}