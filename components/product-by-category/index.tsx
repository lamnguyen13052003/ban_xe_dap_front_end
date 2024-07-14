import React from 'react';
import {Box, Button, Stack} from "@mui/material";
import {Link} from "react-router-dom";
import ProductList from "../product-list";
import {ProductByCategoryType} from "../../types/productByCategory.type";

function ProductByCategory(props: ProductByCategoryType) {
    return (
        <Box>
            <Stack direction={"row"} alignItems={"center"} pb={"5x"}>
                <span style={{
                    background: "linear-gradient(90deg, rgb(67, 158, 239) 27.56%, rgba(39, 232, 246, 0) 85.53%",
                    width: "20px",
                    marginRight: "10px",
                    height: "35px",
                    marginBottom: "2px"
                }}/>
                <h2 className={'text-uppercase text-black fw-bold d-inline m-0'}>{props.title}</h2>
            </Stack>
            <ProductList products={props.products}/>
            <Stack direction={"row"} justifyContent={"center"} width={"100%"} py={"40px"}>
                <Link to={props.to} className={'text-decoration-none'}>
                    <Button className={'text-uppercase text-white rounded-3 fs-4'} style={{
                        background: "linear-gradient(149.58deg, rgb(0, 91, 206) 27.56%, rgb(105, 157, 243) 85.53%)",
                        padding: "5px 75px",
                    }}>XEM THÊM {props.title}</Button>
                </Link>
            </Stack>
        </Box>
    );
}

export default ProductByCategory;
