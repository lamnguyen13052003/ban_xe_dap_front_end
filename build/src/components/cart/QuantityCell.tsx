import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {Stack, Typography} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";
import {useDispatch} from "react-redux";
import {decreaseCartItem, increaseQuantityCartItem} from "../../slice/cart.slice";
import {Container} from "react-bootstrap";
import {ObjectId} from "mongodb";
import {toast} from "react-toastify";

export interface QuantityCellProps {
    id: ObjectId,
    type: string,
    quantity: number;
    hasDispatch: boolean;
    max?: number;
    onChange: (quantity: number) => void;
}


function QuantityCell(props: QuantityCellProps) {
    const {id, type, quantity, hasDispatch, onChange, max} = props;
    const dispatch = useDispatch();
    const increaseQuantity = () => {
        if (max && quantity >= max) return
        if (hasDispatch)
            dispatch(increaseQuantityCartItem({
                _id: id,
                type: type
            }))
        onChange(quantity + 1)
    }

    const decreaseQuantity = () => {
        if (quantity < 2) return;
        if (hasDispatch)
            dispatch(decreaseCartItem({
                _id: id,
                type: type
            }))
        onChange(quantity - 1)
    }

    return (
        <Stack direction={"row"} className={"qty-cell"} style={{
            height: "40px"
        }}>
            <Button className={"h-100"} sx={{width: "20px !important"}} onClick={decreaseQuantity}>
                <RemoveIcon/>
            </Button>
            <Typography className="text-center align-content-center  h-100"
                        style={{width: "50px"}}>
                {quantity}
            </Typography>
            <Button className={"h-100"} sx={{width: "20px !important"}}
                    onClick={increaseQuantity}>
                <AddIcon/>
            </Button>
        </Stack>
    );
}


export default QuantityCell;