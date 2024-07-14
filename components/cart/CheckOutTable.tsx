import TableContainer from "@mui/material/TableContainer";
import {Button, Input, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import SellIcon from "@mui/icons-material/Sell";
import styles from "./scss/Cart.module.css";
import React from "react";
import {CartItemType} from "../../types/cartItem.type";
import {Link} from "react-router-dom";
import {formatCurrency} from "../../utils/Formatter";

export function CheckOutTable({cartItems}: { cartItems: CartItemType[] }) {
    const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">CỘNG GIỎ HÀNG</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="left">Tạm Tính</TableCell>
                            <TableCell align="right">{formatCurrency(total)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">Tổng</TableCell>
                            <TableCell align="right">{formatCurrency(total)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer sx={{padding: "0px 10px", marginTop: "10px"}} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">
                                <SellIcon fontSize="small"/>
                                Phiếu Ưu Đãi
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Input sx={{
                                    width: "100%",
                                    maxWidth: "100%",
                                    margin: "10px 0px",
                                    border: "1px solid #ddds !important"
                                }} placeholder="Mã ưu đãi"></Input>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Link to={"/checkout"} onClick={(event) => {
                if (!cartItems.length) {
                    alert("Giỏ hàng của bạn đang trống!")
                    event.preventDefault()
                }
            }}>
                <Button className={`${styles.checkout_button}`} sx={{
                    ':hover': {backgroundColor: "red", color: "white"},
                    width: "100%",
                    maxWidth: "100%",
                    padding: "5px 16px",
                    textAlign: "center",
                    backgroundColor: "red",
                    color: "white",
                    margin: "10px 0px"
                }}>
                    <Typography sx={{width: "100%"}}>TIẾN HÀNH THANH TOÁN</Typography>
                </Button>
            </Link>
        </>
    );
}