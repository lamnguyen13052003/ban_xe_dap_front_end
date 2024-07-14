import {Box} from "@mui/material";
import React from "react";

export function Address(props: {
    title: string,
    detail: string
}) {
    return (
        <Box sx={{
            py: '5px',
            color: 'white'
        }}>
            <strong>{props.title}: </strong>
            <span>{props.detail}</span>
        </Box>
    )
}