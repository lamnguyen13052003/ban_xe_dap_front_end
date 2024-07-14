import React, {useEffect} from 'react';
import {Box, Stack} from "@mui/material";
import {images as banner_images} from "../assets/images/carousels/images";
import {images as brand_images} from "../assets/images/brands/images";
import {Carousel, Container, Image} from "react-bootstrap";
import LogoBrand from "../components/logo-brand";
import ListCategory from "../components/list-category";
import CarouselProduct from "../components/carousel-product";
import ProductByCategory from "../components/product-by-category";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../configs/store";
import {getProductsByBestSale, getProductsByCategory} from "../slice/product.slice";

/*
xe dap tre em: 0
xe dap the thao: 1
xe dap dia hinh: 2
xe dap dua: 3
xe dap touring: 4
xe dap nu: 5
xe dap gap : 6
 */
function Home() {
    document.title = "Trang chủ"
    const productsState = useSelector((state: RootState) => state.product)
    const dispatch = useAppDispatch()
    const {
        babyBicycle,
        touringBicycle,
        topographicBicycle,
        sportBicycle,
        foldBicycle,
        femaleBicycle,
        racingBicycle,
        newProduct,
        bestSale
    } = productsState

    useEffect(() => {
        dispatch(getProductsByCategory({category: 0, page: 1}))
        dispatch(getProductsByCategory({category: 1, page: 1}))
        dispatch(getProductsByCategory({category: 2, page: 1}))
        dispatch(getProductsByCategory({category: 3, page: 1}))
        dispatch(getProductsByCategory({category: 4, page: 1}))
        dispatch(getProductsByCategory({category: 5, page: 1}))
        dispatch(getProductsByCategory({category: 6, page: 1}))
        dispatch(getProductsByBestSale(true))
        dispatch(getProductsByBestSale(false))
    }, []);

    return (
        <>
            <Box>
                <Container>
                    <Stack direction={"column"} alignItems={'center'} pt={"30px"}>
                        {renderCarousel()}
                        <ListCategory mt={3}/>
                    </Stack>
                </Container>
            </Box>
            <Box pt={4} pb={10} style={{background: "rgba(199, 228, 255, 0.208)"}}>
                <Container>
                    <h2 className={'text-center text-primary fw-bold'}>THƯƠNG HIỆU UY TÍN - CHẤT LƯƠNG</h2>
                    <Stack direction={"row"} flexWrap={"wrap"} gap={4} justifyContent={"center"}>
                        {renderBrand()}
                    </Stack>
                </Container>
            </Box>
            <Box pt={4} pb={10}
                 style={{background: "linear-gradient(296deg, rgb(239, 123, 123) 27.56%, rgb(255, 179, 91) 85.53%)"}}>
                <Container>
                    <h2 className={'text-center text-white fw-bold'}>Sản phẩm bán chạy</h2>
                    <Stack direction={"row"} flexWrap={"wrap"} gap={4} justifyContent={"center"}>
                        <CarouselProduct products={bestSale}/>
                    </Stack>
                </Container>
            </Box>
            <Box pt={4} pb={10}
                 style={{background: "linear-gradient(296deg, rgb(67, 158, 239) 27.56%, rgb(39, 232, 246) 85.53%)"}}>
                <Container>
                    <h2 className={'text-center text-white fw-bold'}>SẢN PHẨM NỔI BẬT</h2>
                    <Stack direction={"row"} flexWrap={"wrap"} gap={4} justifyContent={"center"}>
                        <CarouselProduct products={newProduct}/>
                    </Stack>
                </Container>
            </Box>
            <Box className={'pt-5 pb-5'} style={{background: "rgba(199, 228, 255, 0.208)"}}>
                <Container>
                    <ProductByCategory key={"babyBicycle"}
                                       products={babyBicycle.products}
                                       to={"/xe-dap-tre-em/page/1"}
                                       title={"XE ĐẠP TRẺ EM"}
                    />
                </Container>
            </Box>
            <Box className={'pt-5 pb-5'}>
                <Container>
                    <ProductByCategory key={"a"}
                                       products={sportBicycle.products}
                                       to={"/xe-dap-the-thao/page/1"}
                                       title={"XE ĐẠP THỂ THAO"}
                    />
                </Container>
            </Box>
            <Box className={'pt-5 pb-5'} style={{background: "rgba(199, 228, 255, 0.208)"}}>
                <Container>
                    <ProductByCategory key={"a"}
                                       products={topographicBicycle.products}
                                       to={"/xe-dap-dia-hinh/page/1"}
                                       title={"XE ĐẠP ĐỊA HÌNH"}
                    />
                </Container>
            </Box>
            <Box className={'pt-5 pb-5'}>
                <Container>
                    <ProductByCategory key={"a"}
                                       products={racingBicycle.products}
                                       to={"/xe-dap-dua/page/0"}
                                       title={"XE ĐẠP ĐUA"}
                    />
                </Container>
            </Box>
            <Box className={'pt-5 pb-5'} style={{background: "rgba(199, 228, 255, 0.208)"}}>
                <Container>
                    <ProductByCategory key={"a"}
                                       products={touringBicycle.products}
                                       to={"/xe-dap-touring/page/1"}
                                       title={"XE ĐẠP TOURING"}
                    />
                </Container>
            </Box>
            <Box className={'pt-5 pb-5'}>
                <Container>
                    <ProductByCategory key={"a"}
                                       products={foldBicycle.products}
                                       to={"/xe-dap-gap/page/1"}
                                       title={"XE ĐẠP GẤP"}
                    />
                </Container>
            </Box>
            <Box className={'pt-5 pb-5'} style={{background: "rgba(199, 228, 255, 0.208)"}}>
                <Container>
                    <ProductByCategory key={"a"}
                                       products={femaleBicycle.products}
                                       to={"/xe-dap-nu/page/1"}
                                       title={"XE ĐẠP NỮ"}
                    />
                </Container>
            </Box>
        </>
    );
}

const renderCarousel = () => {
    return <Carousel key={"Carousel_list"} className={'w-100'}>
        {banner_images.map((image, index) => {
            return (<Carousel.Item key={index} style={{
                height: "600px"
            }}>
                <Image src={image} rounded className={'h-100'} width={'100%'}/>
            </Carousel.Item>)
        })}
    </Carousel>
}

const renderBrand = () => {
    return brand_images.map((image, index) => {
        return <LogoBrand key={index} src={image}/>
    });
}


export default Home;

