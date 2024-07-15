import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../configs/store";
import {Container} from "react-bootstrap";
import {PayStatusEnum} from "../states/payStatus.stats";
import {Button, Stack, Table} from "@mui/material";
import {formatDateTime} from "../utils/Formatter";
import {IC_CANCEL, IC_SUCCESS} from "../assets/images/icon/web.icon";
import {Link} from "react-router-dom";

function Pay() {
    document.title = "Thanh toán";
    const payStatus = useSelector((state: RootState) => state.payStatus)

    return (
        <Container className={"my-3"}>
            <Stack direction={"row"} justifyContent={"center"}>
                {payStatus.status === PayStatusEnum.SUCCESS ?
                    (<>
                        <Stack direction={"column"} alignItems={"center"} gap={1}>
                            <img width={75} alt={"success.png"} src={IC_SUCCESS}/>
                            <h3>Thanh toán thành công</h3>
                        </Stack>
                    </>) :
                    (<>
                        <Stack direction={"column"} alignItems={"center"} gap={1}>
                            <img width={75} alt={"failed.png"} src={IC_CANCEL}/>
                            <h3>Thanh toán thất bại</h3>
                        </Stack>
                    </>)}
            </Stack>
            {payStatus.status === PayStatusEnum.SUCCESS ?
                (<>
                    <Stack direction={"row"} justifyContent={"center"}>
                        <Table sx={{
                            width: "50%"
                        }}>
                            <thead>
                            <tr>
                                <th style={{
                                    minWidth: "150px",
                                }}>Thông tin
                                </th>
                                <th className={"d-flex justify-content-end"}>Giá trị</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className={"pe-3"}>Thời gian</td>
                                <td className={"d-flex justify-content-end"}>{formatDateTime(new Date())}</td>
                            </tr>
                            <tr>
                                <td className={"pe-3"}>Tên người nhận</td>
                                <td className={"text-end"}>{payStatus.infoPay?.fullName}</td>
                            </tr>
                            <tr>
                                <td className={"pe-3"}>Email</td>
                                <td className={"text-end"}>{payStatus.infoPay?.email}</td>
                            </tr>
                            <tr>
                                <td className={"pe-3"}>Số điện thoại</td>
                                <td className={"text-end"}>{payStatus.infoPay?.phoneNumber}</td>
                            </tr>
                            <tr>
                                <td className={"pe-3"}>Địa chỉ</td>
                                <td className={"text-end"}>{payStatus.infoPay?.fullAddress}</td>
                            </tr>
                            <tr>
                                <td className={"pe-3"}>Phương thức thanh toán</td>
                                <td className={"text-end"}>{payStatus.infoPay?.payMethod}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Stack>
                </>) :
                (<></>)}
            <Stack direction={"row"} justifyContent={"center"} className={"mt-3"}>
                <Link to={"/"}>
                    <Button className={"p-2 border border-success border-1"}>
                        Quay lại trang chủ
                    </Button>
                </Link>
            </Stack>
        </Container>
    );
}

export default Pay;