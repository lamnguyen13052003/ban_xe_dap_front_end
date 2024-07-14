import React from 'react';
import {Box, Stack} from "@mui/material";
import CartDropDownEmpty from "./CartDropDownEmpty";
import CartDropDownNonEmpty from "./CartDropDownNonEmpty";
import CartItemDropDown from "./CartItemDropDown";
import {CartItemType} from "../../types/cartItem.type";

function CartDropDown(props: {
    cartItems: CartItemType[],
    className?: string,
    style?: React.CSSProperties
}) {
    const {cartItems, className, style} = props;

    return (
        <Box width={"350px"}
             className={className} style={style}>
            <Stack direction={"column"} className={"mt-2 border border-1 bg-white border-success rounded-3 p-2"}>
                <Box sx={{
                    maxHeight: "300px",
                    overflowY: "auto"
                }}>
                    {cartItems.map((item, index) =>
                        <CartItemDropDown key={index} {...item}/>)}
                </Box>
                <Box>
                    {cartItems.length === 0 ? (<CartDropDownEmpty/>) : (<CartDropDownNonEmpty/>)}
                </Box>
            </Stack>
        </Box>
    );
}

export default CartDropDown;