import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Box} from "@mui/material";
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
            <Row direction={"row"} className={"justify-content-center"}>
                <Col lg={8} md={12} className={"rounded-3 border p-0 border-2 overflow-hidden"}>
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
                </Col>
            </Row>
        </Container>
    );
}

export default Sign;