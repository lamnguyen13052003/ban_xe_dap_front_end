import { ObjectId } from "mongodb";
import AddReviewRequest from "../requests/addReview.request";

export type ReviewProductType = AddReviewRequest & {
    _id: ObjectId,
    date: Date
}
