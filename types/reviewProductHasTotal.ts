import {ReviewProductResponseType} from "./reviewProductResponse.type";

export interface ReviewProductHasTotal {
    reviews: ReviewProductResponseType[];
    total: number;
}
