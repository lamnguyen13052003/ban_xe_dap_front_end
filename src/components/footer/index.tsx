import React from 'react';
import styles from './scss/Footer.module.css';
import {Avatar, Box, Tooltip} from "@mui/material";
import {green, indigo, pink} from "@mui/material/colors";
import {Facebook, Instagram, Mail, Phone} from "@mui/icons-material";
import {Link} from "react-router-dom";
import GoogleMapComponent, {location} from "../google-map-component";
import {Address} from "./Address";
import {ItemPolicy} from "./ItemPolicy";
import {Title} from "./Title";
import {Col, Container, Row} from "react-bootstrap";

function Footer() {
    const center: location = {
        lat: 10.882435364738374, // Vĩ độ
        lng: 106.78128601988364 // Kinh độ
    }
    const currentYear = new Date().getFullYear();

    return (
        <footer className={`${styles.footer}`}>
            <Container className={'py-5'}>
                <Row className={''}>
                    <Col xl={4} md={12} xs={12} className={`${styles['flex-1']}`}>
                        <Title title={"thông tin liên hệ"}/>
                        <h5 className={"fw-bold text-white"}>XE ĐẠP GIÁ KHO</h5>
                        <Address title={"CN 1"} detail={"494 Nguyễn Oanh, Phường 6, Q.Gò Vấp, HCM"}/>
                        <Address title={"CN 2"} detail={"322/36 An Dương Vương, P4, Q.5, HCM"}/>
                        <Address title={"CN 3"} detail={"330 Hùng Vương, Ngãi Giao, Châu Đức, BR-VT"}/>
                        <Address title={"CN 4"} detail={"216A Độc Lập, P.Tân Thành, Q.Tân Phú, HCM"}/>
                        <Address title={"CN 5"}
                                 detail={"KĐT Vạn Phúc City - 24 Nguyễn Thị Nhung, P.Hiệp Bình Phư, TP. Thủ Đức"}/>

                    </Col>
                    <Col xl={4} md={12} xs={12} className={`${styles['flex-1']}`}>
                        <Box>
                            <Title title={"Chính sách và hỗ trợ"}/>
                            <ItemPolicy to={"/shopping-guide"} title={"Hướng dẫn mua hàng"}/>
                            <ItemPolicy to={"#"} title={"Chính Sách Thanh Toán"}/>
                            <ItemPolicy to={"#"} title={"Chính sách giao hàng"}/>
                            <ItemPolicy to={"#"} title={"Chính Sách Đổi Trả Hàng"}/>
                            <ItemPolicy to={"#"} title={"Chính Sách Bảo Hành"}/>
                            <ItemPolicy to={"#"} title={"Chính sách bảo mật"}/>
                            <ItemPolicy to={"#"}
                                        title={`Giới Thiệu Hệ Thống Cửa Hàng Xe Đạp Giá Kho ${currentYear}`}/>
                            <ItemPolicy to={"#"} title={`Blog chia sẻ`}/>
                        </Box>
                        <Box sx={{
                            mt: '20px'
                        }}>
                            <Title title={"Kết nối của chúng tôi"}/>
                            <div className={`d-flex gap-2`}>
                                <Tooltip title={"Follow on Instagram"}>
                                    <Avatar sx={{
                                        backgroundColor: pink[500]
                                    }}>
                                        <Instagram/>
                                    </Avatar>
                                </Tooltip>
                                <Tooltip title={"Follow on Facebook"}>
                                    <Link to={"https://www.facebook.com/profile.php?id=100045667640701"}>
                                        <Avatar sx={{
                                            backgroundColor: indigo[900],
                                        }}>
                                            <Facebook/>
                                        </Avatar>
                                    </Link>
                                </Tooltip>
                                <Tooltip title={"Follow on Mail"}>
                                    <Link to={"mailto:kiminonawa1305@gmail.com"}>
                                        <Avatar sx={{
                                            backgroundColor: 'black'
                                        }}>
                                            <Mail/>
                                        </Avatar>
                                    </Link>
                                </Tooltip>
                                <Tooltip title={"Follow on phone"}>
                                    <Link to={"tel:0855354919"}>
                                        <Avatar sx={{
                                            backgroundColor: green[500]
                                        }}>
                                            <Phone/>
                                        </Avatar>
                                    </Link>
                                </Tooltip>
                            </div>
                        </Box>
                    </Col>
                    <Col xl={4} md={12} xs={12} className={`${styles['flex-1']}`}>
                        <Title title={"Hướng dẫn đường tới"}/>
                        <GoogleMapComponent/>
                    </Col>
                </Row>
            </Container>
            <hr className={`my-0 bg-dark`}/>
            <section className={`bg-primary py-5`}>
                <p className={`text-center text-white mb-0`}>
                    © {currentYear} Xe Đạp Kimi. All Rights Reserved. Web Design by
                    <Link to={"#"} className={`text-decoration-none text-white`}> KIMI</Link></p>
            </section>
        </footer>
    );
}


export default Footer;