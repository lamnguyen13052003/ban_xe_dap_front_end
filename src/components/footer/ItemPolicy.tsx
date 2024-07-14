import {Box, Divider} from "@mui/material";
import {Link} from "react-router-dom";
import styles from "./scss/Footer.module.css";
import React from "react";

export function ItemPolicy(props: {
    title: string,
    to: string
}) {
    return (
        <Box sx={{
            py: '5px'
        }}>
            <Link to={props.to} className={`${styles.a}`}>{props.title}</Link>
            <Divider sx={{bgcolor: 'white', height: 2}}/>
        </Box>
    )
}

