
import styled from 'styled-components';

export const ShoppingGuideMain = styled.div`
    padding: 20px;
    font-family: Inter;
`;

export const StyledRow = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 20px;

    .col-left {
        padding: 0 40px;
    }
`;


export const GuideSection = styled.div`
    h1{
        text-align: center;
    }
    h1, h3 {
        font-weight: normal;
        color: #333;
    }
    p {
        font-size: 16px;
        color: #555;
        line-height: 1.6;
    }
    ul {
        list-style-type: disc;
        margin-left: 20px;
    }
    img {
        max-width: 100%;
        height: auto;
        margin: 20px 0;
        border-radius: 8px;
    }
    figure {
        text-align: center;
        margin: 20px 0;
    }
    figcaption {
        font-size: 14px;
        color: #777;
    }
`;

export const WidgetGuide = styled.div`
    position: sticky;
    top: 30px;
    
    h4:first-child {
       font-weight: 700;
        font-size: 20px;
    }
    .trust {
        border: 1px solid #ececec;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        padding: 30px;
    }
    
    .trust-item {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 10px;
        border-top: 1px solid grey;
        padding: 20px;
        div {
            display: flex;
            flex-direction: column;
            
            h4 {
                font-weight: bold;
                font-size: 16px;
            }
            p {
                font-size: 15px;
            }
        }
    }
    
    .trust-item:first-child {
        border-top: none !important;
    }
    
    .contact {
        padding: 0px 0px 0px 0px;
    }
    
    .contact-content {
        margin-top: 20px;
        background: rgb(255, 243, 205);
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        padding: 20px;

        div {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
            
            h5 {
                font-weight: bold;
            }

        }
    }
    
    .address {
        margin-top: 20px;
        
        h3 {
            font-size: 20px;
            margin-top: 20px;
            font-width: 700;
        }
    }
    
    .address ul{
        padding: 10px;
        border: 1px solid #e9ecef;
        border-radius: 10px;

        li {
            background-image: url(/src/assets/images/product-detail/dia-chi.png);
            background-size: 14px 14px;
            background-repeat: no-repeat;
            background-position: 0px 5px;
            padding-left: 25px;
            list-style: none;
            font-size: 16px;
        }
        
    }

    .carousel .object-fit-cover{
        width: auto !important;
    }
    
    .carousel .MuiStack-root {
        flex-direction: column;
    }
`