import React from 'react';
import {Search} from "@mui/icons-material";
import {Avatar, Box, Divider, Stack} from "@mui/material";
import styles from './scss/Header.module.css';
import {Link} from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import Menu from "../menu";
import ButtonAuth from "./ButtonAuth";
import ButtonCart from "./ButtonCart";
import {Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import ContactButton from "./ContactButton";


function Header() {
    return (
        <>
            <Container>
                <Row className={`py-2 align-items-center justify-content-around`}>
                    <Col md={6} lg={2} className={"d-flex flex-column align-items-center"}>
                        <Link to={"/"} className={`${styles.clear_a}`}>
                            <Box className={`justify-content-center d-flex flex-column align-items-center`}>
                                <Avatar alt="Logo" src={logo} sx={{
                                    width: 50,
                                    height: 50,
                                }}/>
                                <h5>XE ĐẠP KIMI</h5>
                            </Box>
                        </Link>
                        <Menu/>
                    </Col>
                    <Col md={6} lg={6}>
                        <InputGroup>
                            <Form. Control id={"search-bar"} type="text" placeholder={""}
                                   className={`${styles.input_focus} ${styles.input}`}/>
                            <label className={"input-group-text"} htmlFor={"search-bar"} style={{
                                borderRadius: "0 50px 50px 0",
                            }}><Search/></label>
                        </InputGroup>
                    </Col>
                    <Col md={6} lg={2}>
                        <ButtonAuth/>
                    </Col>
                    <Col md={6} lg={2} >
                        <Stack className={"flex-row flex-md-column justify-content-center"} gap={2} alignItems={"center"}>
                            <ButtonCart/>
                            <ContactButton/>
                        </Stack>
                    </Col>
                </Row>
            </Container>
            <Divider sx={{bgcolor: 'black', height: 2}}/>
        </>
    )
}

export default Header;