import DisplayUserReview from "../product-detail/DisplayUserReview";
import {ObjectId} from "mongodb";
import {Stack} from "@mui/material";
import {ReviewProductResponseType} from "../../types/reviewProductResponse.type";

export default function (props: { reviews: ReviewProductResponseType[], userId?: ObjectId }) {
    return (
        <Stack direction={'row'} flexWrap={"wrap"}>
            {props.reviews.map((review: ReviewProductResponseType, index: number) => {
                return <DisplayUserReview key={index} review={review} userId={props.userId}/>
            })}
        </Stack>
    )
}
