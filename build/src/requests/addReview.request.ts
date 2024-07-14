import {ObjectId} from "mongodb";

export default interface AddReviewRequest {
    productId: ObjectId,
    userId: ObjectId,
    rating: number,
    comment: string,
}
