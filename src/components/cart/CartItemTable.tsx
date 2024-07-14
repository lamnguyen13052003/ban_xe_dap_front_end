import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import CartItem from "./index";
import {CartItemType} from "../../types/cartItem.type";
import {useSelector} from "react-redux";
import {RootState} from "../../configs/store";

export function CartItemTable() {
    const cartItems: CartItemType[] = useSelector((state: RootState) => state.cart.cartItems);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">SẢN PHẨM</TableCell>
                        <TableCell align="left"></TableCell>
                        <TableCell align="center">GIÁ</TableCell>
                        <TableCell align="center">SỐ LƯỢNG</TableCell>
                        <TableCell align="center" sx={{
                            width: "150px !important"
                        }}>TỔNG CỘNG</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartItems.map((item: CartItemType) => (
                        <TableRow>
                            <TableCell>
                                <CartItem
                                    key={item.id.toString()}
                                    {...item}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}