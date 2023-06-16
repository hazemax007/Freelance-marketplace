import { User } from "./User"

export class Message{
    _id?:any
    content?:string
    messageType?:string
    sender?:User
    receiver?:User
    timestamp?: any
}