import { Rating } from "./Rating"

export class Mission{
    _id?:any
    title?:string
    description?:string
    field?:string
    technology?:string
    requirments?:string
    duration?:number
    ratings?:Rating[]
}