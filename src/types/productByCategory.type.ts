import {ProductType} from "./product.type";

export interface ProductByCategoryType {
    title: string,
    products: ProductType[],
    to: string
}