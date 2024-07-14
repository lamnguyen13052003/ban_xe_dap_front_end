import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ReviewProductHasTotal} from "../types/reviewProductHasTotal";
import {ReviewProductResponseType} from "../types/reviewProductResponse.type";
import {ObjectId} from "mongodb";

const initialState: ReviewProductHasTotal = {
    reviews: [],
    total: 0
}

const reviewProductSlice = createSlice({
    name: 'review product slice',
    initialState: initialState,
    reducers: {
        setReviews: (state, payload: PayloadAction<ReviewProductResponseType[]>) => {
            state.reviews = [];
            payload.payload.forEach(review => state.reviews.push(review))
            state.total = payload.payload.length
        },
        addReview: (state, payload: PayloadAction<ReviewProductResponseType>) => {
            state.total++
            state.reviews.push(payload.payload)
        },
        updateReview: (state, payload: PayloadAction<ReviewProductResponseType>) => {
            state.reviews.forEach(review => {
                if (review._id === payload.payload._id) {
                    review.comment = payload.payload.comment
                    review.rating = payload.payload.rating
                    review.date = payload.payload.date
                    return;
                }
            })
        },
        deleteReview: (state, payload: PayloadAction<ObjectId>) => {
            state.reviews = state.reviews.filter(review => review._id !== payload.payload)
        }
    }
})

export const {setReviews, addReview, updateReview, deleteReview} = reviewProductSlice.actions;
const reviewProductReducer = reviewProductSlice.reducer
export default reviewProductReducer
