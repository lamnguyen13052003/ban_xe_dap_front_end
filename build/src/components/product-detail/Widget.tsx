import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Widget} from "./ProductDetailComponent";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const StickyWidget = (props: { warranty: string }) => {
    return (
        <>
            <Widget>
                <Row>
                    <Col className={"trust"} sm={12}>
                        <h4>LÝ DO NÊN MUA HÀNG TẠI XEDAPGIAKHO:</h4>
                        <div className={"trust-item"}>
                            <img src="/src/assets/images/product-detail/icon-product-detail-2.webp"/>
                            <div>
                                <h4>
                                    Bảo hành tận nhà
                                </h4>
                                <p>
                                    Bảo hành vàng
                                </p>
                            </div>
                        </div>
                        <div className={"trust-item"}>
                            <img src="/src/assets/images/product-detail/icon-product-detail-4.webp"/>
                            <div>
                                <h4>
                                    Giao hàng miễn phí
                                </h4>
                                <p>
                                    Nhanh - Uy tín
                                </p>
                            </div>
                        </div>
                        <div className={"trust-item"}>
                            <img src="/src/assets/images/product-detail/icon-product-detail-1.webp"/>
                            <div>
                                <h4>
                                    Mua hàng trả góp
                                </h4>
                                <p>
                                    Thủ tục nhanh gọn
                                </p>
                            </div>
                        </div>
                        <div className={"trust-item"}>
                            <img src="/src/assets/images/product-detail/icon-product-detail-3.webp"/>
                            <div>
                                <h4>
                                    Cam kết chính hãng
                                </h4>
                                <p>
                                    Bảo dưỡng {props.warranty}
                                </p>
                                <span>Lưu ý: Thông số kỹ thuật có thể được thay đổi từ nhà sản xuất nhằm nâng cao chất lượng sản phẩm</span>
                            </div>
                        </div>
                    </Col>
                    <Col className={"contact"} sm={12}>
                        <div className={"contact-content"}>
                            <LocalPhoneIcon fontSize="large"/>
                            <div>
                                <h5>
                                    Hỗ Trợ Mua Hàng
                                </h5>
                                <h5>
                                    0855354919
                                </h5>
                            </div>
                        </div>
                    </Col>
                    <Col className={"address"} sm={12}>
                        <h3>HỆ THỐNG CỬA HÀNG</h3>
                        <div>
                            <ul>
                                <li>494 Nguyễn Oanh, Phường 6, Quận Gò Vấp, HCM</li>
                                <li>322/36 An Dương Vương, Phường 4, Quận 5, HCM</li>
                                <li> 330 Hùng Vương, Ngãi Giao, Châu Đức, BR-VT</li>
                                <li> 216A Độc Lập, P.Tân Thành, Q.Tân Phú, HCM</li>
                                <li>KDT Vạn Phúc City, 24 Nguyễn Thị Nhung, P. Hiệp Bình Phước, TP.Thủ Đức</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Widget>
        </>
    );
}

export default StickyWidget;