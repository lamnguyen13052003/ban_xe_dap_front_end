import React, {useEffect, useState} from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import * as pdc from './ProductDetailComponent';
import {TechSpec} from './ProductDetailComponent';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ColorSelector from './ColorSelector';
import QuantityCell from '../cart/QuantityCell';
import {Avatar, Box, Button, Grid, Input, Stack, TextField} from '@mui/material';
import {formatCurrency} from "../../utils/Formatter";
import {ProductType} from "../../types/product.type";
import {useDispatch, useSelector} from "react-redux";
import {addCartItem, addCartItemPayNow} from "../../slice/cart.slice";
import HoverRating from "../hover-rating";
import {green} from "@mui/material/colors";
import ReviewList from "../review-list";
import {ModelType} from "../../types/modelProduct.type";
import {useNavigate} from 'react-router';
import {RootState} from "../../configs/store";
import AddReviewRequest from '../../requests/addReview.request';
import {toast} from 'react-toastify';
import axiosHttp from '../../utils/axiosHttp';
import {AxiosError, AxiosResponse} from 'axios';
import {ResponseApi} from '../../types/response.type';
import {ReviewProductResponseType} from '../../types/reviewProductResponse.type';
import {useForm} from "react-hook-form";
import {addReview, setReviews} from '../../slice/reviewProduct.slice';
import {ship} from "../../assets/images/product-detail/imges";

const ProductDetailCol = (product: ProductType) => {
    const nav = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const reviews = useSelector((state: RootState) => state.reviewProduct.reviews)
    const dispatch = useDispatch();
    const [modelSelected, setModelSelected] = useState<ModelType>(product.model[0]);
    const [quantity, setQuantity] = useState<number>(1);
    const [rating, setRating] = useState<number>(3);
    const {register, setValue, handleSubmit, formState: {errors}} = useForm<AddReviewRequest>({
        defaultValues: {
            userId: user?._id,
            productId: product._id,
        }
    });
    const onSubmitAddReview = (request: AddReviewRequest) => {
        request.rating = rating;
        toast.promise<AxiosResponse<ResponseApi<ReviewProductResponseType>>, AxiosError<string>, any>(
            axiosHttp.post("/api/reviews/add", request),
            {
                pending: "Đang gửi đánh giá",
                success: {
                    render({data: response}) {
                        return response.data.message
                    },
                },
                error: {
                    render: ({data: {response}}) => {
                        return response?.data ?? "Đã có lỗi xảy ra"
                    }
                }
            }
        ).then((response) => {
            if (!response?.data?.data) return;
            setValue("comment", "");
            setRating(3);
            const review = response.data.data;
            dispatch(addReview(review))
        })
    }

    useEffect(() => {
        dispatch(setReviews(product.reviews))
    }, []);

    return (
        <Row>
            <Col sm={12} style={{borderBottom: '2px solid #efefef'}}>
                <pdc.ShortDes>
                    <Row>
                        <Col xl={7} md={12}>
                            <ImageGallery
                                showBullets={false}
                                showFullscreenButton={false}
                                showPlayButton={false}
                                items={product.model.map((model) => ({
                                    original: model.pathImageColor,
                                    thumbnail: model.pathImageColor,
                                }))}
                            />
                        </Col>
                        <Col xl={5} md={12} className="short-des"  style={{
                            background: '#cfcfcf2b',
                            borderRadius: '5px',
                        }}>
                            <div style={{display: 'flex', gap: '20px', flexDirection: 'column'}}>
                                <h4 style={{fontWeight: 'bold'}}>{product.name}</h4>
                                <div style={{
                                    background: '#4d90fe21',
                                    borderRadius: '5px',
                                    padding: '10px 14px 1px 10px'
                                }}>
                                    <ul>
                                        <li>Xe Nhập Khẩu Chính Hãng</li>
                                        <li>Bảo Hành {product.specifications.warranty}</li>
                                    </ul>
                                </div>
                                <Row className={"price justify-content-center align-items-center"}
                                     style={{fontWeight: 'bold', fontSize: '24px'}}>
                                    {product.discount ?
                                        (<>
                                            <Col md={6} sm={12}
                                                 className={"text-center"}
                                                 style={{color: 'red'}}>
                                                {formatCurrency((100 - product.discount) * product.price / 100)}
                                            </Col>
                                            <Col md={6} sm={12}
                                                 className={"text-center fs-6"}
                                                 style={{textDecoration: 'line-through'}}>
                                                {formatCurrency(product.price)}
                                            </Col>
                                        </>) :
                                        (<Col md={12} style={{color: 'red'}}
                                              className={"text-center"}>
                                            {formatCurrency(product.price)}
                                        </Col>)
                                    }
                                </Row>
                                <img src={ship} alt="Shipping"/>
                                <div className="product-detail-offer">
                                    <h3>ƯU ĐÃI ĐẶC BIỆT</h3>
                                    <ul>
                                        <li>Khuyến mãi xe đạp trong tháng (<a href="#">Xem chi tiết</a>)</li>
                                        <li>Quà tặng đến <span style={{color: 'red'}}>450.000 đồng</span></li>
                                        <li>Phiếu mua hàng trị giá đến <span
                                            style={{color: 'red'}}>2 triệu đồng</span></li>
                                        <li>Đạp xe về nhà tăng thêm <span
                                            style={{color: 'red'}}>50.000 đồng</span></li>
                                    </ul>
                                </div>
                                <span>Mã: {product.base_description.product_id}</span>
                                <div>
                                    <h4>Chọn màu sắc:</h4>
                                    <ColorSelector
                                        models={product.model.map(model => {
                                            return model;
                                        })}
                                        selectedColor={modelSelected.color}
                                        onSelectColor={(model) => setModelSelected(model)}
                                    />
                                </div>
                                <hr/>
                                <div className="add_to_cart">
                                    <div>
                                        <QuantityCell id={product._id}
                                                      hasDispatch={false}
                                                      type={modelSelected.color}
                                                      quantity={quantity}
                                                      max={modelSelected.quantity}
                                                      onChange={(quantity) => {
                                                          setQuantity(quantity);
                                                      }}
                                        />
                                        <Button className="text-uppercase mb-3 add-cart" variant="contained"
                                                color="info" onClick={() => {
                                            dispatch(addCartItem({
                                                id: product._id,
                                                name: product.name,
                                                url: product.model[0].pathImageColor,
                                                price: product.discount ? (100 - product.discount) * product.price / 100 : product.price,
                                                quantity: quantity,
                                                type: modelSelected.color,
                                            }))
                                            setQuantity(1)
                                        }}>
                                            Thêm vào giỏ hàng
                                        </Button>
                                    </div>
                                    <Button className={"buy-now"} variant="contained" onClick={() => {
                                        dispatch(addCartItemPayNow({
                                            id: product._id,
                                            name: product.name,
                                            url: product.model[0].pathImageColor,
                                            price: product.discount ? (100 - product.discount) * product.price / 100 : product.price,
                                            quantity: quantity,
                                            type: modelSelected.color,
                                        }))
                                        nav("/checkout")
                                    }}>
                                        Mua ngay
                                    </Button>
                                </div>
                                <div>
                                    <ul>
                                        <li>Gọi đặt mua: 0855354919 | Chat với chúng em!</li>
                                        <li>Hãy nhập số điện thoại của anh chị vào đây ạ, chúng em sẽ gọi lại tư
                                            vấn ngay cho anh chị về sản phẩm này ạ!
                                        </li>
                                    </ul>
                                    <div className={"form-product"}>
                                        <Input placeholder="Số điện thoại" fullWidth={true}/>
                                        <Button variant="contained" href="#">
                                            Gửi
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </pdc.ShortDes>
            </Col>
            <Col sm={12} style={{display: 'flex', flexDirection: 'column', gap: '50px'}}>
                <Row>
                    <Col lg={8} md={12} style={{
                        marginTop: "40px",
                        padding: "10px",
                        border: "2px solid grey",
                        borderRadius: "5px",
                        backgroundColor: "#f9f9f9",
                    }}>
                        <Box className={"fs-3 mb-3 fw-bold"}>Nội Dung Mục Lục</Box>
                        <ul className={""} style={{
                            listStyle: "decimal"
                        }}>
                            <li>
                                <a href={"#basic-des"}
                                   style={{
                                       color: "#444",
                                       boxShadow: "none",
                                       textDecoration: "none",
                                       textShadow: "none",
                                       display: "inline-flex",
                                       alignItems: "stretch",
                                       flexWrap: "nowrap"
                                   }}>Mô Tả Cơ Bản</a>
                            </li>
                            <li>
                                <a href={"#tech-spec"} style={{
                                    color: "#444",
                                    boxShadow: "none",
                                    textDecoration: "none",
                                    textShadow: "none",
                                    display: "inline-flex",
                                    alignItems: "stretch",
                                    flexWrap: "nowrap"
                                }}>Bảng Thông Số Kỹ Thuật</a>
                            </li>
                            <li>
                                <a href={"#product-content"} style={{
                                    color: "#444",
                                    boxShadow: "none",
                                    textDecoration: "none",
                                    textShadow: "none",
                                    display: "inline-flex",
                                    alignItems: "stretch",
                                    flexWrap: "nowrap"
                                }}>Đặc Điểm Nổi Bật {product.name}</a>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <pdc.Des>
                    <div id="basic-des">
                        <h2>Mô Tả Cơ Bản</h2>
                        <ul>
                            <li><span>Mã sản phẩm:</span> {product.base_description.product_id}</li>
                            <li><span>Thương hiệu:</span> {product.base_description.brand}</li>
                            <li><span>Màu sắc:</span> {product.model.map(model => model.color).join(', ')}</li>
                            <li><span>Kich cở:</span> {product.base_description.size}</li>
                            <li><span>Chất liệu:</span> {product.base_description.material}</li>
                        </ul>
                    </div>
                    <div id="tech-spec">
                        <h2>Thông số kỹ thuật</h2>
                        <TechSpec>
                            <table>
                                <tbody>
                                <tr>
                                    <td>Tên</td>
                                    <td>Giá trị</td>
                                </tr>
                                <tr>
                                    <td>Kích thước khung</td>
                                    <td>{product.specifications.frameSize}</td>
                                </tr>
                                <tr>
                                    <td>Chất liệu khung</td>
                                    <td>{product.specifications.frameMaterial}</td>
                                </tr>
                                <tr>
                                    <td>Kích thước bánh xe</td>
                                    <td>{product.specifications.wheelSize}</td>
                                </tr>
                                <tr>
                                    <td>Hệ thống truyền lực</td>
                                    <td>{product.specifications.drivetrain}</td>
                                </tr>
                                <tr>
                                    <td>Hệ thống treo</td>
                                    <td>{product.specifications.ForkAndSuspension}</td>
                                </tr>
                                <tr>
                                    <td>Hệ thống phanh (thắng)</td>
                                    <td>{product.specifications.brakes}</td>
                                </tr>
                                <tr>
                                    <td>Yên xe</td>
                                    <td>{product.specifications.saddle}</td>
                                </tr>
                                <tr>
                                    <td>Trọng lượng</td>
                                    <td>{product.specifications.weight}</td>
                                </tr>
                                <tr>
                                    <td>Tay lái</td>
                                    <td>{product.specifications.handlebarsAndStem}</td>
                                </tr>
                                <tr>
                                    <td>Phụ kiện kèm theo</td>
                                    <td>{product.specifications.includedAccessories}</td>
                                </tr>
                                <tr>
                                    <td>Bảo hành</td>
                                    <td>{product.specifications.warranty}</td>
                                </tr>
                                <tr>
                                    <td>Mục đích sử dụng</td>
                                    <td>{product.specifications.targetUsing}</td>
                                </tr>
                                </tbody>
                            </table>
                        </TechSpec>
                    </div>
                </pdc.Des>
                {
                    (product.reviews.length || user?._id && product.hasBuy) ?
                        <>
                            <pdc.Comment className="mb-3">
                                <div id="form">
                                    <h3>Đánh giá</h3>
                                    <div>
                                        <Box style={{
                                            width: '100%',
                                            border: '2px solid #2372dc',
                                            borderRadius: '10px',
                                            padding: '30px'
                                        }}>
                                            <ReviewList reviews={reviews} userId={user && user._id}/>
                                            {(user?._id && product.hasBuy) ?
                                                <>
                                                    <Grid container>
                                                        <Grid item xs={1}>
                                                            <Avatar alt={!user.fullName ? `` : user.fullName}
                                                                    src={!user.urlAvatar ? `` : `${user.urlAvatar}`}
                                                                    className={'m-auto'}
                                                                    sx={{backgroundColor: green[500]}}></Avatar>
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <Stack direction={'column'} spacing={1}>
                                                                <Box
                                                                    className={'fw-bold'}>{!user.fullName ? `Name` : user.fullName}</Box>
                                                            </Stack>
                                                        </Grid>
                                                    </Grid>
                                                    <form method={"POST"}
                                                          onSubmit={handleSubmit(onSubmitAddReview)}>
                                                        <HoverRating rating={rating}
                                                                     onClick={(rating) => setRating(rating)}/>
                                                        <Box>
                                                            <TextField
                                                                id="filled-multiline-static"
                                                                label="Đánh giá của bạn"
                                                                multiline
                                                                rows={4}
                                                                variant="filled"
                                                                fullWidth
                                                                {...register("comment", {
                                                                    required: "Vui lòng nhập đánh giá"
                                                                })}
                                                                error={!!errors.comment}
                                                                helperText={errors.comment?.message}
                                                            />
                                                        </Box>
                                                        <Button
                                                            style={{
                                                                marginTop: '20px',
                                                                width: '150px',
                                                                height: '45px'
                                                            }}
                                                            variant={"contained"}
                                                            type={"submit"}
                                                            size={"medium"}>
                                                            Gửi
                                                        </Button>
                                                    </form>
                                                </> :
                                                <></>
                                            }
                                        </Box>
                                    </div>
                                </div>
                            </pdc.Comment>
                        </> :
                        <></>
                }
            </Col>
        </Row>
    )
        ;
};

export default ProductDetailCol;

