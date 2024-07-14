import React from 'react';
import {Image} from "react-bootstrap";
import {Box} from "@mui/material";

function LogoBrand(props: {
    src: string
}) {
    return (
        <Box className={"bg-white"} width={"150px"} height={"50px"} style={{borderRadius: "25px"}}>
            <Image className={'p-2'} width={"100%"} height={"100%"} src={props.src} style={{
                border: "gray 1px solid",
                borderRadius: "25px",
            }}/>
        </Box>
    )
}

export default LogoBrand;