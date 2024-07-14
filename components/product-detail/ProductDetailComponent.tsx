import styled from "styled-components";



export const ShortDes = styled.div`
    h3 {
        border-radius: 5px !important;
        padding: 2px 20px !important;
        background: #439eef;
        width: 50%;
        position: relative;
        transform: translate(50%, -50%);
        text-align: center;
    }

    .short-des h4 {
        font-size: 20px;
    }

    .price span:first-child {
        color: #353535 !important;
        font-weight: 400;
        font-family: sans-serif;
    }

    .add_to_cart {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .qty-cell {
            display: flex;
            width: 50%;
            margin: 0;
            padding: 0;

            p {
                margin: 0;
            }

            button {
                background-color: #f1f1f1;
                color: #000;
                padding: 0;
                min-width: 30px !important;
                border: 1px solid #ddd;
                border-radius: unset;
            
                svg {
                    height: 15px !important;;
                    width: 15px !important;
                }
                
              
            }

            p {
                background-color: white;
                color: #000;
                padding: 0;
                border: 1px solid #ddd;
                border-radius: unset;
            }
        }

        > div {
            display: flex;
            gap: 10px;
            justify-content: flex-start;

        }

        button.add-cart {
            height: 100%;
            width: 100%;
            font-size: 18px;
            font-weight: 700;
        }
    }


    .buy-now {
        background: rgb(255, 141, 0);
        color: white;;
    }

    .form-product {
        display: flex;
        gap: 35px;

        input {
            background-color: white;
            border-color: rgba(0, 0, 0, .09);
            border-radius: 99px;
            box-shadow: none;
            color: currentColor !important;
            padding: 10px 15px;

        }

        .MuiInput-root::before, .MuiInput-root::after {
            border-bottom: 0px !important;
        }

        .MuiInput-root:hover::before, .MuiInput-root:hover::after {
            border-bottom: 0px !important;
        }

        button {
            border-radius: 8px;
            background-color: #439eef;
            color: #fff;
            opacity: 1;
            outline: none;
        }
    }

    ul {
        padding: 0;

        li {
            list-style: none !important;
            background-image: url('/src/assets/images/product-detail/icon-tich.png');
            background-size: 14px 14px;
            background-repeat: no-repeat;
            background-position: 0px 5px;
            padding-left: 25px;
        }
    }

    .product-detail-offer {
        padding: 2px 20px !important;
        border: 1px solid #439eef;

        h3 {
            background: #439eef;
            color: #e9ecef;
            padding: 2px 20px;
            font-family: sans-serif;
            font-size: 15px;
            line-height: 1.6;
            font-weight: 600;
        }
    }
    
    
    .color-wrapper  {
        padding: 3px;
        border: 3px solid grey;
        border-radius: 5px;
        
        &:hover, &:active {
            border: 3px solid black;
        }
    }
`

export const Toc = styled.div `
    margin-top: 40px;
    width: 60%;
    padding: 10px;
    border: 2px solid grey;
    border-radius: 5px;
    background-color: #f9f9f9;
    
    
    p {
        font-size: 20px;
        font-weight: 500;
        text-align: left;
        margin-bottom: 10px;
    }
    
    ul {
        list-style: decimal;
        li {
            font-size: 18px;
            a {
                color: #444;
                box-shadow: none;
                text-decoration: none;
                text-shadow: none;
                display: inline-flex;
                align-items: stretch;
                flex-wrap: nowrap;
                
                &:hover {
                    text-decoration: underline ;
                }
            }
        }    
    }
`

export const Des = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px; 
    
    h2 {
         font-weight: 700;
         font-size: 30px;
    }
    
    #basic-des ul {
        line-height: 40px;
        li {
            font-size: 18px;
            span {
                font-weight: 700;
            }
        }
    }
`

export const Widget = styled.div`
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

export const Comment = styled.div`
    .MuiInputBase-root {
        background-color: unset !important;   
    }
`

export const RelatedProduct = styled.div`
    .carousel .object-fit-cover{
        width: auto;
    }
    
    .p-2 .MuiStack-root, span.fs-4.text-danger {
        font-size: 15px !important;
    }
`

export const TechSpec = styled.div`
    table {
        width: 100%;
        height: 400px;
        border-spacing: 1px;
        text-align: center;
        border: 1px solid #ececec;
        
        tr {
            height: 21px;
        }

        tr:first-child {
            font-weight: bold;
            background-color: #5da2ff;
            color: white !important;
        }
        
        tr:nth-child(even) {
            background-color: #2372dc0f;
        }
        
        td {
            padding: 12px;
            width: 60%;
            height: 10px;
        }
        
        tr td:first-child {
            font-weight: bold;
        }
    }
`