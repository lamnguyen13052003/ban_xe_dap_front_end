import {ObjectId} from "mongodb";
import {BaseDescriptionProductType} from "./baseDescriptionProduct.type";
import {DetailDescriptionProductType} from "./detailDescriptionProduct.type";
import {SpecificationsType} from "./specifications.type";
import {ModelType} from "./modelProduct.type";
import {ReviewProductResponseType} from "./reviewProductResponse.type";

export type ProductType = {
    _id: ObjectId,
    sale?: boolean,
    new?: boolean,
    discount?: number,
    imagePath: string,
    name: string,
    price: number,
    category: number,
    base_description: BaseDescriptionProductType,
    detail_description: DetailDescriptionProductType[],
    specifications: SpecificationsType,
    model: ModelType[],
    reviews: ReviewProductResponseType[],
    hasBuy: boolean,
}
