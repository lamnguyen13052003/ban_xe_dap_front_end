import React from 'react';
// @ts-ignore
import Slider from 'react-slick';
import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Product {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    salePrice: number;
    sale: string;

}

interface ProductSliderProps {
    products: Product[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {

    const formatCurrency = (amount: number): string => {
        return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <StyledSlider {...settings}>
            {products.map(product => (
                <ProductCard key={product.id}>
                    <div className={"sale-wrapper"}><div className={"sale-badge"}>Giảm {product.sale}</div></div>
                    <img src={product.imageUrl} alt={product.name} />
                    <p>{product.name}</p>
                    <div className={"price-wrapper"}>
                        <p style={{textDecorationLine: "line-through", color: "#353535", opacity: ".6"}}>{formatCurrency(product.price)}</p>
                        <p style={{color: "red"}}>{formatCurrency(product.salePrice)}</p>
                    </div>
                </ProductCard>
            ))}
        </StyledSlider>
    );
};

const StyledSlider = styled(Slider)`
  .slick-slide {
    padding: 10px;
  }
`;

const ProductCard = styled.div`
    
    background: #fff;
    border: 1px solid #ddd;
    text-align: center;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,.1), 0 2px 6px 2px rgba(60,64,67,.15);
    border-radius: 15px;
    
    img {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
    }
        
    p {
        margin-top: 10px;
        font-size: 16px;
        font-weight: bold;
    }
    
    .price-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    
    .sale-wrapper {
        
     
        
        
        .sale-badge {
            position: absolute;
            height: 30px;
            color: white;
            font-size: 16px;
            font-weight: 700;
            background-image: linear-gradient(-90deg, #ff1313 0%, #ffbf61 100%);
            border-radius: 10px;
            padding: 3px;
            min-width: auto;


            &:before {
                content: "";
                display: inline-block;
                background: url(https://xedapgiakho.com/wp-content/uploads/2023/06/flash.webp);
                background-size: 50% 50%;
                width: 20px;
                height: 20px;
                background-repeat: no-repeat;
                background-position: center center;
                background-color: #f13500;
                border-radius: 50%;
                vertical-align: middle;
                margin-right: 2px;
            }
        }
    }
`;

export default ProductSlider;
