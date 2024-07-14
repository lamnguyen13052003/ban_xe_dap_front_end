import React from 'react';
import {Container} from "react-bootstrap";
import {Box, Stack} from "@mui/material";
import background from "../assets/images/background.jpg"
import {Outlet} from "react-router";
import {RootState} from "../configs/store";
import {useSelector} from "react-redux";

function Sign() {
    let title = useSelector((state: RootState) => {
        return state.signTitle.title;
    });

    return (
        <Container className={"py-5"}>
            <Stack direction={"row"} className={"justify-content-center"}>
                <Box className={"w-50 rounded-3 border border-2 overflow-hidden"}>
                    <Box className={"shadow w-100 d-flex justify-content-center align-items-center"}
                         style={{
                             background: `url(${background})`,
                             height: "150px",
                             backgroundPosition: "center",
                             backgroundRepeat: "no-repeat",
                             backgroundSize: "100% 100%",
                         }}>
                        <h2 className={"fw-bold text-white text-uppercase"}>{title}</h2>
                    </Box>
                    <Outlet/>
                </Box>
            </Stack>
        </Container>
    );
}

export default Sign;