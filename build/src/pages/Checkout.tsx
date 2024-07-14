import React, {useEffect} from 'react';
import {Box, Button, Divider, Stack} from "@mui/material";
import {CartBreadcrumbs, CartBreadcrumbStatus} from "../components/cart/CartBreadcrumbs";
import {Button as ButtonBootstrap, Col, Container, Form, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {InfoPayType, PayMethodEnum} from "../types/infoPay.type";
import axios, {AxiosResponse} from "axios";
import {ResponseApiEsgoo} from "../types/responeApiEsgoo.type";
import {LocaltionEsgooType} from "../types/localtionEsgoo.type";
import {CartItemType} from "../types/cartItem.type";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../configs/store";
import {setPayStatus} from "../slice/payStatus.slice";
import {PayStatusEnum} from "../states/payStatus.stats";
import {IC_CASH, IC_QR} from "../assets/images/icon/web.icon";
import {useNavigate} from "react-router-dom";
import axiosHttp from "../utils/axiosHttp";
import {ResponseApi} from "../types/response.type";
import {BillItemType} from "../types/billItem.type";
import {toast} from "react-toastify";
import {PayRequest} from "../requests/pay.request";
import {clearCart, clearCartPayNow, setPayNow} from "../slice/cart.slice";
import {User} from "../types/user.type";
import CircularProgress from '@mui/material/CircularProgress';

export default function Checkout() {
    const user: User | undefined = useSelector((state: RootState) => state.auth.user);
    const cart = useSelector((state: RootState) => state.cart);
    const cartItems = cart.payNow ? cart.cartItemsPayNow : cart.cartItems;
    const [qrPayStatus, setQrPayStatus] = React.useState<boolean>();
    const [qrPay, setQrPay] = React.useState<string>();
    const nav = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<InfoPayType>();
    const [provinces, setProvinces] = React.useState<LocaltionEsgooType[]>([])
    const [districts, setDistricts] = React.useState<LocaltionEsgooType[]>([])
    const [wards, setWards] = React.useState<LocaltionEsgooType[]>([])
    const [fullAddress, setFullAddress] = React.useState<string>()
    const [payMethodSelect, setPayMethodSelect] = React.useState<PayMethodEnum>(PayMethodEnum.CASH)
    const dispatch = useDispatch();

    const onSubmit = (infoPay: InfoPayType) => {
        infoPay.payMethod = payMethodSelect
        if (!user || !user._id) {
            toast.error("Vui lòng đăng nhập để tiếp tục thanh toán")
            return
        }
        infoPay._id = user._id

        axiosHttp
            .post<any, AxiosResponse<any, ResponseApi<string>>, PayRequest>(
                "/api/pay",
                {
                    infoPay: infoPay,
                    products: cartItems.map((item: CartItemType) => {
                        return {
                            _id: item.id,
                            model: item.type,
                            quantity: item.quantity
                        } as BillItemType
                    })
                })
            .then(() => {
                dispatch(setPayStatus({
                    status: PayStatusEnum.SUCCESS,
                    infoPay: infoPay
                }))
                if (cart.payNow)
                    dispatch(clearCartPayNow());
                else
                    dispatch(clearCart());
                nav("/pay")
            })
            .catch(error => {
                dispatch(setPayStatus({
                    status: PayStatusEnum.FAILED,
                    infoPay: infoPay
                }))
                nav("/pay")
            });
    };

    useEffect(() => {
        document.title = "Tiến hành thanh toán"
        if (!cart.cartItems.length && !cart.cartItemsPayNow.length) nav("/");

        const eventBack = (event: BeforeUnloadEvent) => {
            dispatch(setPayNow(false))
        }
        window.addEventListener('beforeunload', eventBack);

        return () => {
            window.removeEventListener('beforeunload', eventBack);
            axios.get<any, AxiosResponse<ResponseApiEsgoo<LocaltionEsgooType[]>>, any>("https://esgoo.net/api-tinhthanh/1/0.htm")
                .then((response: AxiosResponse<ResponseApiEsgoo<LocaltionEsgooType[]>>) => {
                    setProvinces(response.data.data)
                }).catch((error) => {
                console.log(error)
            });
        }
    }, []);

    const selectProvinceHandle = (id: number) => {
        setWards([])
        axios.get<any, AxiosResponse<ResponseApiEsgoo<LocaltionEsgooType[]>>, any>(`https://esgoo.net/api-tinhthanh/2/${id}.htm`)
            .then((response: AxiosResponse<ResponseApiEsgoo<LocaltionEsgooType[]>>) => {
                setDistricts(response.data.data)
            }).catch((error) => {
            console.log(error)
        });

        provinces.forEach((item) => {
            if (item.id == id) {
                setFullAddress(item.full_name)
                return;
            }
        });
    }

    const selectDistrictHandle = (id: number) => {
        axios.get<any, AxiosResponse<ResponseApiEsgoo<LocaltionEsgooType[]>>, any>(`https://esgoo.net/api-tinhthanh/3/${id}.htm`)
            .then((response: AxiosResponse<ResponseApiEsgoo<LocaltionEsgooType[]>>) => {
                setWards(response.data.data)
            }).catch((error) => {
            console.log(error)
        });

        districts.forEach((item) => {
            if (item.id == id) {
                setFullAddress(prevState => item.full_name + ", " + prevState)
                return
            }
        });
    }

    const getBorderPayMethod = (method: PayMethodEnum) => {
        return method === payMethodSelect ? 'border-2 border-success' : 'border-1 border-secondary'
    }

    const generateQRPay = () => {
        if (qrPay) return qrPay;
        const totalPay = cartItems.map((item: CartItemType) => item.price * item.quantity).reduce((a, b) => a + b, 0);
        axios.post("https://api.vietqr.io/v2/generate", {
            "accountNo": "0855354919",
            "accountName": "Nguyễn Đình Lam",
            "acqId": 963388,
            "amount": Math.floor(totalPay),
            "addInfo": "Thanh toán đơn hàng",
            "format": "text",
            "template": "compact"
        })
            .then(response => {
                setQrPay(response.data.data.qrDataURL)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <Container className={"mb-3 px-5"}>
            <Box>
                <CartBreadcrumbs status={CartBreadcrumbStatus.CHECKOUT}/>
            </Box>
            <Box>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md={4}>
                            <h3>Thông tin người dùng</h3>
                            <Form.Group as={Col} md="12" className="position-relative mb-3" controlId={"fullName"}>
                                <Form.Label>Họ và tên</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={"Nguyễn Văn A"}
                                    {...register("fullName", {
                                        required: 'Họ và tên không được để trống'
                                    })}
                                    isInvalid={!!errors.fullName}
                                />
                                <Form.Control.Feedback type="invalid" tooltip as={"div"}>
                                    {errors.fullName?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" className="position-relative mb-3" controlId={"email"}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder={"abc@gmail.com"}
                                    {...register("email", {
                                        required: 'Email không được để trống',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "email không hợp lệ!"
                                        }
                                    })}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" className="position-relative mb-3" controlId={"phoneNumber"}>
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={"+8485535*****"}
                                    {...register("phoneNumber", {
                                        required: 'Số điện thoại không được để trống',
                                        pattern: {
                                            value: /^0[0-9]{9}$/,
                                            message: "Số điện thoại không hợp lệ!"
                                        }
                                    })}
                                    isInvalid={!!errors.phoneNumber}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errors.phoneNumber?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" className="position-relative mb-3" controlId={"note"}>
                                <Form.Label>Ghi chú</Form.Label>
                                <Form.Control
                                    as={"textarea"}
                                    placeholder={"Ghi chú..."}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={1} className={"d-flex justify-content-center"}>
                            <Divider style={{
                                width: "2px",
                                backgroundColor: "black",
                                height: "100%"
                            }} orientation="vertical" flexItem/>
                        </Col>
                        <Col md={3}>
                            <h3>Thông tin giao hàng</h3>
                            <Form.Group as={"div"} className="position-relative mb-3" controlId={"province"}>
                                <Form.Label>Chọn tỉnh thành/thành phố</Form.Label>
                                <Form.Select
                                    {...register("province", {
                                        required: 'Tỉnh thành/thành phố không được để trống',
                                    })}
                                    isInvalid={!!errors.province}
                                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                        selectProvinceHandle(parseInt(event.target.value))
                                    }}
                                >
                                    <option defaultValue={""} value={""}>Chọn tỉnh thành/thành phố</option>
                                    {provinces.map((item, index) => (
                                        <option key={index} value={item.id}>{item.full_name}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errors.province?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={"div"} className="position-relative mb-3" controlId={"district"}>
                                <Form.Label>Chọn quận/huyện</Form.Label>
                                <Form.Select
                                    {...register("district", {
                                        required: 'Quận/huyện không được để trống',
                                    })}
                                    isInvalid={!!errors.district}
                                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                        selectDistrictHandle(parseInt(event.target.value))
                                    }}
                                >
                                    <option defaultValue={""} value={""}>Chọn quận/huyện</option>
                                    {districts.map((item, index) => (
                                        <option key={index} value={item.id}>{item.full_name}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errors.district?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={"div"} className="position-relative mb-3" controlId={"ward"}>
                                <Form.Label>Chọn phường/xã</Form.Label>
                                <Form.Select
                                    {...register("ward", {
                                        required: 'Phường/xã không được để trống',
                                    })}
                                    isInvalid={!!errors.ward}
                                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                        const id = parseInt(event.target.value)
                                        wards.forEach((item) => {
                                            if (item.id == id) {
                                                setFullAddress(prevState => item.full_name + ", " + prevState)
                                                return
                                            }
                                        });
                                    }}
                                >
                                    <option defaultValue={""} value={""}>Chọn phường/xã</option>
                                    {wards.map((item, index) => (
                                        <option key={index} value={item.id}>{item.full_name}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errors.ward?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={"div"} className="position-relative mb-3" controlId={"fullAddress"}>
                                <Form.Label>Địa chỉ cụ thể</Form.Label>
                                <Form.Control
                                    type={"text"}
                                    {...register("fullAddress", {
                                        required: 'Địa chỉ cụ thể không được để trống',
                                    })}
                                    isInvalid={!!errors.ward}
                                    value={fullAddress}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errors.fullAddress?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={1} className={"d-flex justify-content-center"}>
                            <Divider style={{
                                width: "2px",
                                backgroundColor: "black",
                                height: "100%"
                            }} orientation="vertical" flexItem/>
                        </Col>
                        <Col md={3}>
                            <h3>Thông tin thanh toán</h3>
                            <Stack direction={"row"} className="mb-3" gap={1}>
                                <Button title={"Thanh toán khi nhận hàng"}
                                        className={`p-2 border ${getBorderPayMethod(PayMethodEnum.CASH)}`}
                                        onClick={() => {
                                            setPayMethodSelect(PayMethodEnum.CASH)
                                            setQrPayStatus(false)
                                        }}>
                                    <img width={30} src={IC_CASH} alt={"cash.png"}/>
                                </Button>

                                <Button title={"Chuyển khoản"}
                                        className={`p-2 border ${getBorderPayMethod(PayMethodEnum.QR)}`}
                                        onClick={() => {
                                            setPayMethodSelect(PayMethodEnum.QR)
                                            setQrPayStatus(true)
                                            generateQRPay()
                                        }}>
                                    <img width={30} src={IC_QR} alt={"cash.png"}/>
                                </Button>
                            </Stack>
                            <Box sx={{
                               justifyContent: "center",
                                 alignItems: "center",
                            }} className={` ${qrPayStatus ? 'd-flex' : 'd-none'}`}>
                                {
                                    qrPay ? <img className={"w-100"} src={qrPay} alt={"qrPay"}/> : <CircularProgress color="success"/>
                                }
                            </Box>
                        </Col>
                    </Row>
                    <Stack direction={"row"} justifyContent={"end"}>
                        <ButtonBootstrap type="submit" className={"bg-primary rounded rounded-2 text-white py-2 px-5"}>
                            Thanh toán
                        </ButtonBootstrap>
                    </Stack>
                </Form>
            </Box>
        </Container>
    )
}
