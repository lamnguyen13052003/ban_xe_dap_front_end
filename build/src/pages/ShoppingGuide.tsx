import React from "react";
import {
    StyledRow,
    GuideSection,
    WidgetGuide,
    ShoppingGuideMain
} from "../components/shopping-guide/guide-components";
import { Row, Col } from "react-bootstrap";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

function ShoppingGuide() {
    return (
        <ShoppingGuideMain>
        <StyledRow>
            <Col sm={9} className={"col-left"}>
                <GuideSection>
                    <div className="std">
                        <h1>
                            <strong>HƯỚNG MUA HÀNG TẠI WEBSITE XE ĐẠP KIMI</strong>
                        </h1>
                        <p>
                            Khi công nghệ ngày càng phát triển, việc mua sắm trực tuyến trở nên phổ biến hơn bao giờ
                            hết. Với website XE ĐẠP KIMI, bạn có thể dễ dàng chọn lựa và mua sắm các loại xe đạp từ các
                            thương hiệu nổi tiếng mà không
                            cần phải đến trực tiếp cửa hàng. Trong bài viết này, chúng tôi sẽ hướng dẫn bạn chi tiết
                            cách mua hàng với hai phương thức đơn giản: <strong>Gọi điện trực tiếp</strong> và{" "}
                            <strong>đặt mua hàng online tại website.</strong>
                        </p>
                        <h3>
                            <strong>Cách 1: Gọi điện trực tiếp mua hàng</strong>
                        </h3>
                        <p>
                            Phương thức đầu tiên và cũng là phương thức truyền thống nhất khi mua hàng chính là gọi điện
                            trực tiếp. Đây là cách nhanh chóng và thuận tiện, đặc biệt đối với những người không quen sử
                            dụng các thiết bị công
                            nghệ hoặc muốn được tư vấn trực tiếp từ nhân viên bán hàng. Để thực hiện mua hàng qua điện
                            thoại, bạn cần làm theo các bước sau:
                        </p>
                        <ul>
                            <li>Bạn tham khảo các mẫu xe đạp trên Website hiện có.</li>
                            <li>Ghi chú lại mã sản phẩm và các thông tin cần thiết để tiện lợi hơn khi gọi điện.</li>
                            <li>
                                Gọi số <strong>0855354919</strong> từ 08:00 đến 21:00 các ngày trong tuần để đặt hàng.
                                Nhân viên chúng tôi luôn sẵn sàng phục vụ, tư vấn và hỗ trợ quý khách mua được sản phẩm
                                phù hợp, ưng ý.
                            </li>
                        </ul>
                        <figure>
                            <img src="src/assets/images/shopping-guide/huong-dan-mua-hang-1.jpg" width="683"
                                 height="454"/>
                            <figcaption>Gọi đến hotline 0855354919 từ 08:00 đến 21:00 để được tư vấn và hỗ trợ mua
                                hàng
                            </figcaption>
                        </figure>
                        <h3>
                            <strong>Cách 2: Đặt mua hàng online tại website XE ĐẠP KIMI</strong>
                        </h3>
                        <p>
                            Nếu bạn thích sự tiện lợi và nhanh chóng của việc mua sắm trực tuyến, XE ĐẠP KIMI cũng cung
                            cấp dịch vụ đặt mua hàng online ngay trên website. Dưới đây là hướng dẫn chi tiết từng bước
                            để bạn có thể dễ dàng thực
                            hiện.
                        </p>
                        <h3>
                            <strong>Bước 1: Tìm Sản Phẩm Cần Mua</strong>
                        </h3>
                        <p>
                            Đầu tiên, hãy truy cập vào website{" "}
                            <a title="Xe Đạp KIMI" href="#">
                                <em>XE ĐẠP KIMI</em>
                            </a>
                            . Giao diện trang chủ sẽ hiển thị nhiều sản phẩm nổi bật, danh mục sản phẩm và các chương
                            trình khuyến mãi hiện có. Nếu bạn đã có sản phẩm cụ thể muốn mua, hãy sử dụng thanh tìm kiếm
                            ở đầu trang để nhập tên hoặc
                            mã sản phẩm. Ví dụ, bạn muốn tìm xe đạp địa hình, chỉ cần nhập “xe đạp địa hình” vào thanh
                            tìm kiếm và nhấn Enter.
                        </p>
                        <figure>
                            <img src="src/assets/images/shopping-guide/huong-dan-mua-hang-1.jpg" width="683"
                                 height="454"/>
                            <figcaption>Giao diện trang chủ XE ĐẠP KIMI
                            </figcaption>
                        </figure>
                        <br/>
                        <figure>
                            <img src="src/assets/images/shopping-guide/huong-dan-mua-hang.jpg" width="683"
                                 height="454"/>
                            <figcaption>Gõ tên hoặc mã sản phẩm vào thanh tìm kiếm để dễ dàng tìm thấy sản phẩm cần
                                mua
                            </figcaption>
                        </figure>
                        <p>
                            Nếu bạn chưa có sản phẩm cụ thể trong đầu, bạn có thể duyệt qua các danh mục sản phẩm ở menu
                            chính. XE ĐẠP KIMI phân loại sản phẩm theo các danh mục như xe đạp thể thao, xe đạp địa
                            hình, xe đạp thành phố, xe đạp
                            trẻ em, và phụ kiện. Hãy bấm vào danh mục phù hợp để xem toàn bộ sản phẩm trong danh mục đó.
                        </p>
                        <figure>
                            <img src="src/assets/images/shopping-guide/huong-dan-mua-hang-8.jpg" width="683"
                                 height="454"/>
                            <figcaption>Danh mục sản phẩm đa dạng nhiều mẫu mã
                            </figcaption>
                        </figure>
                        <h3>
                            <strong>Bước 2: Xem chi tiết sản phẩm</strong>
                        </h3>
                        <p>
                            Khi bạn đã tìm được sản phẩm ưng ý, hãy nhấp vào nút xem chi tiết bên dưới để xem chi tiết.
                            Trang chi tiết sản phẩm sẽ cung cấp đầy đủ thông tin về giá, mô tả sản phẩm, các tính năng,
                            thông số kỹ thuật, hình
                            ảnh,...
                        </p>
                        <figure>
                            <img
                                src="src/assets/images/shopping-guide/huong-dan-mua-hang-4.jpg"
                                width="683"
                                height="454"/>
                            <img
                                src="src/assets/images/shopping-guide/huong-dan-mua-hang-9.jpg"
                                width="683"
                                height="454"/>
                            <img
                                src="src/assets/images/shopping-guide/huong-dan-mua-hang-10.jpg"
                                width="683"
                                height="454"/>
                            <figcaption>Trang sản phẩm đầy đủ thông tin, chi tiết</figcaption>
                        </figure>
                        <p>
                            Nếu bạn quyết định mua sản phẩm, hãy chọn màu và số lượng và sau đó bấm vào nút “Thêm vào
                            giỏ hàng”. Một cửa sổ sẽ xuất hiện thông báo sản phẩm đã được thêm vào giỏ hàng của bạn. Bạn
                            có thể tiếp tục mua sắm các
                            sản phẩm khác hoặc tiến hành đặt hàng.
                        </p>
                        <figure>
                            <img
                                src="src/assets/images/shopping-guide/huong-dan-mua-hang-11.jpg"
                                width="683"
                                height="454"/>
                            <figcaption>Bấm “Thêm vào giỏ hàng” để mua sản phẩm</figcaption>
                        </figure>
                        <figure>
                            <img
                                src="src/assets/images/shopping-guide/huong-dan-mua-hang-2.jpg"
                                width="683"
                                height="454"/>
                            <figcaption>Thông báo thêm sản phẩm vào giỏ hàng thành công</figcaption>
                        </figure>
                        <p>
                            Khi đã sẵn sàng đặt hàng, hãy nhấp vào biểu tượng giỏ hàng ở góc trên bên phải của trang
                            web. Trang giỏ hàng sẽ hiển thị toàn bộ sản phẩm bạn đã chọn, số lượng, giá thành và tổng
                            tiền. Tại đây, bạn có thể điều
                            chỉnh số lượng sản phẩm hoặc xóa bỏ sản phẩm không mong muốn.
                        </p>
                        <figure>
                            <img
                                src="src/assets/images/shopping-guide/huong-dan-mua-hang-5.jpg"
                                width="683"
                                height="454"
                            />
                            <figcaption>Trang giỏ hàng cho phép bạn điều chỉnh số lượng sản phẩm hoặc xóa bỏ các mặt
                                hàng không mong muốn
                            </figcaption>
                        </figure>
                        <p>
                            Khi đã kiểm tra kỹ giỏ hàng, hãy bấm vào nút “Tiến hành đặt hàng”. Trang thanh toán sẽ yêu
                            cầu bạn cung cấp thông tin cá nhân, địa chỉ giao hàng và phương thức thanh toán thuận tiện
                            với bạn. Hãy điền đầy đủ và
                            chính xác các thông tin sau:
                        </p>
                        <ul>
                            <li>Họ và tên</li>
                            <li>Số điện thoại</li>
                            <li>Địa chỉ email</li>
                            <li>Địa chỉ giao hàng</li>
                        </ul>
                        <figure>
                            <img src="src/assets/images/shopping-guide/huong-dan-mua-hang-6.jpg" width="683"
                                 height="454"/>
                            <figcaption>Thông tin giao hàng đầy đủ, chi tiết
                            </figcaption>
                            <img src="src/assets/images/shopping-guide/huong-dan-mua-hang-7.jpg" width="683"
                                 height="454"/>
                            <figcaption> Ngoài ra shop còn cho phép thanh toán bằng mã QR
                            </figcaption>
                        </figure>
                        <p>
                            Mua hàng tại XE ĐẠP KIMI rất đơn giản và tiện lợi với hai phương thức chính là gọi điện trực
                            tiếp và đặt mua hàng online. Dù bạn chọn phương thức nào,{" "}
                            <a title="XE ĐẠP KIMI" href="#">
                                <em>XE ĐẠP KIMI</em>
                            </a>{" "}
                            đều cam kết mang đến cho bạn trải nghiệm mua sắm tốt nhất với các sản phẩm chất lượng và
                            dịch vụ hỗ trợ khách hàng chuyên nghiệp.
                        </p>
                    </div>
                </GuideSection>
            </Col>
            <Col sm={3} className={"col-right"}>
                <WidgetGuide>
                    <Row>
                        <Col className={"trust"} sm={12}>
                            <h4>LÝ DO NÊN MUA HÀNG TẠI XEDAPGIAKHO:</h4>
                            <div className={"trust-item"}>
                                <img src="/src/assets/images/product-detail/icon-product-detail-2.webp" />
                                <div>
                                    <h4>Bảo hành tận nhà</h4>
                                    <p>Bảo hành vàng</p>
                                </div>
                            </div>
                            <div className={"trust-item"}>
                                <img src="/src/assets/images/product-detail/icon-product-detail-4.webp" />
                                <div>
                                    <h4>Giao hàng miễn phí</h4>
                                    <p>Nhanh - Uy tín</p>
                                </div>
                            </div>
                            <div className={"trust-item"}>
                                <img src="/src/assets/images/product-detail/icon-product-detail-1.webp" />
                                <div>
                                    <h4>Mua hàng trả góp</h4>
                                    <p>Thủ tục nhanh gọn</p>
                                </div>
                            </div>
                            <div className={"trust-item"}>
                                <img src="/src/assets/images/product-detail/icon-product-detail-3.webp" />
                                <div>
                                    <h4>Cam kết chính hãng</h4>
                                    <p>Giá cả hợp lý</p>
                                </div>
                            </div>
                        </Col>
                        <Col className={"contact"} sm={12}>
                            <div className={"contact-content"}>
                                <LocalPhoneIcon fontSize="large" />
                                <div>
                                    <h5>Hỗ Trợ Mua Hàng</h5>
                                    <h5>0855354919</h5>
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
                </WidgetGuide>
            </Col>
        </StyledRow>
        </ShoppingGuideMain>
    );
}

export default ShoppingGuide;
