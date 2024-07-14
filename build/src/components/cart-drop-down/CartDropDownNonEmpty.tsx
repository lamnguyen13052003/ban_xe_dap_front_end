import React from 'react';
import {Button, Divider, Stack} from "@mui/material";
import {Link} from "react-router-dom";

function CartDropDownEmpty() {
    return (
        <Stack direction={"column"}>
            <Divider orientation="vertical" flexItem/>
            <Stack direction={"column"} gap={1}>
                <Link to={"/cart"} className={"text-decoration-none d-block"}>
                    <Button className={"w-100 bg-primary rounded-3 text-uppercase fw-bold text-white"}>
                        xem giỏ hàng
                    </Button>
                </Link>
                <Link to={"/checkout"} className={"text-decoration-none d-block"}>
                    <Button className={"w-100 bg-danger rounded-3 text-uppercase fw-bold text-white"}>
                        Thanh toán
                    </Button>
                </Link>
            </Stack>
        </Stack>
    );
}

export default CartDropDownEmpty;