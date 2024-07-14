import React from 'react';
import {Button, Stack} from "@mui/material";
import {Link} from "react-router-dom";

function CartDropDownEmpty() {
    return (
        <Stack direction={"column"} alignItems={"center"}>
            <span className={"mt-3 text-center mb-2"}>Không tồn tại sản phẩm nào trong giỏ hàng</span>
            <Link to={"/"} className={"text-decoration-none d-block"}>
                <Button className={"w-100 bg-primary rounded-3 text-uppercase fw-bold text-white"}>
                    Quay lại cửa hàng
                </Button>
            </Link>
        </Stack>
    );
}

export default CartDropDownEmpty;