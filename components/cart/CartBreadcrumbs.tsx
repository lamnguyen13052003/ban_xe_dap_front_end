import React from 'react';
import {Typography} from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import styled from 'styled-components';

export enum CartBreadcrumbStatus {
    CART, CHECKOUT, PAYMENT_SUCCESS
}

export function CartBreadcrumbs(props: { status: CartBreadcrumbStatus }) {
    const getColor = (key: CartBreadcrumbStatus) => {
        if (key === props.status) return "back";
        else return "#c4c4c4";
    }

    const breadcrumbs = [
        <Typography key="1" color={getColor(CartBreadcrumbStatus.CART)}>
            GIỎ HÀNG
        </Typography>,
        <Typography key="2" color={getColor(CartBreadcrumbStatus.CHECKOUT)}>
            THÔNG TIN THANH TOÁN
        </Typography>,
        <Typography key="3" color={getColor(CartBreadcrumbStatus.PAYMENT_SUCCESS)}>
            HOÀN THÀNH ĐƠN HÀNG
        </Typography>,
    ];

    return (
        <BreadcrumbsWrapper>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small"/>}
                aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
        </BreadcrumbsWrapper>
    );
}


const BreadcrumbsWrapper = styled.div`
    ol {
        justify-content: center;
        margin-bottom: 20px;

        .active_breadcrumbs p & {
            color: black;
        }
    }
`;
