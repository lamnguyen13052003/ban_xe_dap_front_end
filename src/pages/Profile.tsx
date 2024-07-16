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
        axiosHttp.get<any, AxiosResponse<ResponseApi<InfoPayType[]>>, any>("/api/bill/{auth._id}")
            .then((response) => {
                const data = response.data.data;
                if (!data) setBills([])
                else setBills(data)
            })
    }, [])

    return (
        <Card border="light" className="bg-white shadow-sm mb-4 p-3">
            <h4>Quản lý hóa đơn</h4>
            <Row className={"fs-5 mt-3"}>
                <Col xs={1}>STT</Col>
                <Col xs={2}>Ho và tên</Col>
                <Col xs={2}>SĐT</Col>
                <Col xs={5}>Địa chỉ</Col>
                <Col xs={2} className={"text-center"}>Phương thức thanh toán</Col>
            </Row>
            {
                bills.map((value, index) =>
                    <BillItem data={value} index={index} key={index}/>
                )
            }
        </Card>
    )
}

function BillItem(props: { index: number, data: InfoPayType }) {
    const {fullName, email, phoneNumber, fullAddress, payMethod} = props.data
    return (
        <Row>
            <Col xs={1}>{props.index}</Col>
            <Col xs={2}>{fullName}</Col>
            <Col xs={2}>{email}</Col>
            <Col xs={5}>{fullAddress}</Col>
            <Col xs={2} className={"text-center"}>{payMethod}</Col>
        </Row>
    );
}

export default ProfilePage;
