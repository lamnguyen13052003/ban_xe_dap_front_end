import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {Image} from "react-bootstrap";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {IconButton} from "@mui/material";
import QuantityCell from "./QuantityCell";
import {CartItemType} from "../../types/cartItem.type";
import {useDispatch} from "react-redux";
import {removeCartItem} from "../../slice/cart.slice";
import {formatCurrency} from "../../utils/Formatter";

function CartItem(props: CartItemType) {
    const {id, name, quantity, price, url, type} = props;
    const dispatch = useDispatch();

    return (
        <TableRow>
            <TableCell>
                <Image className={"rounded-3"} src={url} alt={name} style={{width: "100px"}}/>
            </TableCell>
            <TableCell className={"overflow-x-hidden"}>
                <span>
                    {name}
                </span>
                <br />
                <span>
                   Mẫu: {type}
                </span>
            </TableCell>
            <TableCell align="left">{formatCurrency(price)}</TableCell>
            <TableCell>
                <QuantityCell id={id} type={props.type} hasDispatch={true} onChange={(number) => {
                }} quantity={quantity}/>
            </TableCell>
            <TableCell align="center">{formatCurrency(quantity * price)}</TableCell>
            <TableCell>
                <IconButton onClick={() => {
                    dispatch(removeCartItem(id))
                }}>
                    <CloseIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
}


export default CartItem;
