import {ProductType} from "./product.type";

export interface ProductHasTotalType {
    category: string
    products: ProductType[]
    total: number
}