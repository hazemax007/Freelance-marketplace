import { Mission } from "./Mission"
import { User } from "./User"

export class Rating {
    _id?:any
    value?:number
    user?:User
    mission?:Mission
}