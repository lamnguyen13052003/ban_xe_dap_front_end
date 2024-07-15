import React, {useEffect, useState} from 'react';
import ProductDetailCol from "../components/product-detail/ProductDetailCol";
import {Row, Col, Container} from "react-bootstrap";
import StickyWidget from "../components/product-detail/Widget";
import {Box, Stack} from "@mui/material";
import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import {ProductType} from "../types/product.type";
import Product from "../components/product";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {useNavigate, useParams} from "react-router-dom";
import {AxiosResponse} from "axios";
import {ResponseApi} from "../types/response.type";
import axiosHttp from "../utils/axiosHttp";
import {getRecentlyProduct} from "../utils/sessionStorage";
import {RootState} from '../configs/store';
import {useSelector} from 'react-redux';
import CarouselProduct from "../components/carousel-product";


export function ProductDetail() {
    document.title = "Chi tiết sản phẩm"
    const user = useSelector((state: RootState) => state.auth.user);
    const {name} = useParams<{ name: string }>();
    const [product, setProduct] = useState<ProductType>();
    const nav = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0)
        try {
            const idString = name?.split("--")[1];
            axiosHttp.get<any, AxiosResponse<any, ResponseApi<ProductType>>, any>(`api/product-detail/${idString}`, {
                params: {
                    user: user?._id ? user._id : ""
                }
            })
                .then((response: AxiosResponse<ResponseApi<ProductType>>) => {
                    setProduct(response.data.data)
                })
                .catch(() => {
                        nav("/");
                    }
                )
        } catch (error) {
            nav("/");
        }
    }, []);

    const recentlyProduct = getRecentlyProduct()

    return (
        <Row className={"w-100 m-0 p-xxl-5 px-md-0 px-0"}>
            <Col xxl={12}>
                {product ?
                    (<Row>
                        <Col xl={9} md={12}>
                            <ProductDetailCol {...product}/>
                        </Col>
                        <Col xl={3} md={12}>
                            <StickyWidget warranty={product.specifications.warranty}/>
                        </Col>
                    </Row>) :
                    (<h2>Loading....</h2>)
                }
            </Col>
            <Col xxl={12} className={`mt-3 px-5 ${!recentlyProduct.length && 'd-none'}`}>
                <Box className={"fs-3"}>Sản phẩm xem gần đây</Box>
                <Stack direction={"row"} flexWrap={"wrap"}>
                    <CarouselProduct products={recentlyProduct}/>
                </Stack>
            </Col>
        </Row>
    );
}
