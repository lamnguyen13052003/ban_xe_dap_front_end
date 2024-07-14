import {ObjectId} from "mongodb";

export type CartItemType = {
    id: ObjectId,
    url: string,
    name: string,
    type: string,
    price: number,
    quantity: number,
}