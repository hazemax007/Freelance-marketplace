import { Mission } from "./Mission"
import { User } from "./User"

export class Resume{
    _id?:any
    category?:any
    email?:any[]
    mobile_no?:any
    name?:any
    skills?:any[]
    user?:User
    project?:Mission
}