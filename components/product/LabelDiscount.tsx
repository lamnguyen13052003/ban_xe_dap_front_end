import {Box, Stack} from "@mui/material";
import React from "react";
import styles from "./scss/Product.module.css";
import BoltIcon from "@mui/icons-material/Bolt";

export default function LabelDiscount(prop: { discount: number }) {
    return (
        <>
            <Box className={`${styles.sale_label}`}>
                <Stack className={'p-1  d-flex align-items-center'} direction="row" spacing={1}>
                    <Box className={' rounded-circle bg-danger text-center'}>
                        <BoltIcon/>
                    </Box>
                    <span>Giảm {prop.discount}%</span>
                </Stack>
            </Box>
        </>
    )
}