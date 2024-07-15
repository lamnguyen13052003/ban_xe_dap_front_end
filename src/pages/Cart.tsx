import React from 'react';
import {Box, Button, Stack, Typography} from "@mui/material";
import {Col, Container, Row} from "react-bootstrap";
import WestIcon from '@mui/icons-material/West';
import styled from 'styled-components';
import styles from "../components/cart/scss/Cart.module.css";
import {CheckOutTable} from "../components/cart/CheckOutTable";
import {CartItemTable} from "../components/cart/CartItemTable";
import {CartItemType} from "../types/cartItem.type";
import {useSelector} from "react-redux";
import {RootState} from "../configs/store";
import {CartBreadcrumbs, CartBreadcrumbStatus} from "../components/cart/CartBreadcrumbs";

export default function Cart() {
    document.title = "Giỏ hàng";
    const cartItems: CartItemType[] = useSelector((state: RootState) => state.cart.cartItems);

    return (
        <Container className={"mb-3"}>
            <CartBreadcrumbs status={CartBreadcrumbStatus.CART}/>
            <Row>
                <Col lg={9}>
                    <CartItemTable/>
                    <Stack direction={"row"} className={"mt-3 justify-content-md-start justify-content-center"}>
                        <Button className={`${styles.update_cart}`}
                                sx={{padding: " 5px 16px", border: "2px solid #439eef", fontWeight: "700"}}
                                onClick={() => {
                                    history.back();
                                }}>
                            <WestIcon fontSize="small"/>
                            <Typography>TIẾP TỤC XEM SẢN PHẨM</Typography>
                        </Button>
                    </Stack>
                </Col>
                <Col lg={3}>
                    <CheckOutTable cartItems={cartItems}/>
                </Col>
            </Row>
        </Container>
    );
}

const ContinueShopping = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    gap: 20px;
`

const CheckOut = styled.div`
    max-width: 30%;
    width: 30%;
`;

const CartTable = styled.div`
    max-width: 70%;
    width: 70%;
`;

const CartWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    max-width: 100%;
    gap: 10px;
`;