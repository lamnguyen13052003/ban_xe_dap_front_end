import React from "react";
import Link from "@mui/material/Link";
import { Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
}

interface ProductDetailBreadcrumbsProps {
    productDetailColItem: {
        category: string;
        title: string;
    };
}

export function ProductDetailBreadcrumbs({ productDetailColItem }: ProductDetailBreadcrumbsProps) {
    const breadcrumbs = [
        <Link underline="none" key="2" color="#c4c4c4" href="#" onClick={handleClick}>
            Trang Chủ
        </Link>,
        <Link underline="none" key="3" color="#c4c4c4" href="#" onClick={handleClick}>
            {productDetailColItem.category}
        </Link>,
        <Typography className="active_breadcrumbs" key="1" color="black">
            {productDetailColItem.title}
        </Typography>
    ];

    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
        </Breadcrumbs>
    );
}
