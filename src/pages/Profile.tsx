import React, {useEffect, useState} from "react";
import {Card, Col, Container, Row} from 'react-bootstrap';
import ProfileMenu from "../components/profile/profileMenu";
import ProfileForm from "../components/profile/personalInfo";
import {InfoPayType} from "../types/infoPay.type";
import axiosHttp from "../utils/axiosHttp";
import {useSelector} from "react-redux";
import {RootState} from "../configs/store";
import {useNavigate} from "react-router-dom";
import {AxiosResponse} from "axios";
import {ResponseApi} from "../types/response.type";
import {Box} from "@mui/material";

export type MenuItem = "" | "BILL"

const ProfilePage: React.FC = () => {
    const [menuSelected, setMenuSelected] = useState<MenuItem>("" as MenuItem)

    const render = () => {
        switch (menuSelected) {
            case "":
                return <ProfileForm/>
            case "BILL":
                return <BillManager/>
        }
    }

    return (
        <Container>
            <Row className={"justify-content-between"}>
                <Col sm={3}>
                    <ProfileMenu menuItemSelected={menuSelected} onSelected={(key) => {
                        setMenuSelected(key)
                    }}/>
                </Col>
                <Col sm={9}>
                    {render()}
                </Col>
            </Row>
        </Container>
    );
};

function BillManager() {
    const [bills, setBills] = useState<InfoPayType[]>([])
    const auth = useSelector((state: RootState) => state.auth.user)
    const nav = useNavigate();

    useEffect(() => {
        if (!auth || !auth._id) {
            nav("/")
            return;
        }

        if (bills.length) return;
        axiosHttp.get<any, AxiosResponse<ResponseApi<InfoPayType[]>>, any>(`/api/bills/${auth._id}`)
            .then((response) => {
                const data = response.data.data;
                if (!data) setBills([])
                else setBills(data)
            })
    }, [])

    return (
        <Card border="light" className="bg-white shadow-sm mb-4 p-3">
            <h4>Quản lý hóa đơn</h4>
            <Box className={"border mt-3 border-1 rounded rounded-3 overflow-x-hidden"}>
                <Row className={"fs-5 p-2 m-0"}>
                    <Col xs={1}>STT</Col>
                    <Col xs={2}>Họ và tên</Col>
                    <Col xs={2}>SĐT</Col>
                    <Col xs={2}>email</Col>
                    <Col xs={3}>Địa chỉ</Col>
                    <Col xs={2} className={"text-center"}>Phương thức thanh toán</Col>
                </Row>
                <hr className={"m-0"}/>
                {
                    bills.map((value, index) =>
                        <BillItem data={value} index={index} key={index}/>
                    )
                }
            </Box>
        </Card>
    )
}

function BillItem(props: { index: number, data: InfoPayType }) {
    const {fullName, email, phoneNumber, fullAddress, payMethod} = props.data

    return (
        <Row className={`${props.index % 2 === 0 ? 'bg-white' : "bg-secondary-subtle"}  p-2 m-0`}>
            <Col xs={1}>
                {props.index}
            </Col>
            <Col xs={2}>
                {fullName}
            </Col>
            <Col xs={2}>
                {phoneNumber}
            </Col>
            <Col xs={2}>
                {email}
            </Col>
            <Col xs={3}>
                {fullAddress}
            </Col>
            <Col xs={2} className={"text-center"}>
                {payMethod}
            </Col>
        </Row>
    );
}

export default ProfilePage;
