import React, {useState} from "react";
import {Card, Button} from 'react-bootstrap';
import Avatar from "../../assets/images/profile/me.png";
import AvatarBackGround from "../../assets/images/profile/back-ground.png";
import {MenuItem} from "../../pages/Profile";


function ProfileMenu(props: { menuItemSelected: MenuItem, onSelected: (key: MenuItem) => void }) {


    const getFormatSelectMenu = (key: MenuItem) => {
        return key === props.menuItemSelected ? "text-white bg-primary" : "text-black bg-white";
    }

    return (
        <Card border="light" className="text-center p-0 mb-4">
            <div
                style={{backgroundImage: `url(${AvatarBackGround})`}}
                className="profile-cover rounded-top"
            />
            <Card.Body className="pb-5">
                <Card.Img
                    style={{width: "250px", height: "240px"}}
                    src={Avatar}
                    className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
                />
            </Card.Body>
            <ul className={"list-unstyled border border-1 rounded-3 overflow-hidden"}>
                <li className={`text-start  p-2 fw-bold ${getFormatSelectMenu("")}`}
                    onClick={() => {
                        props.onSelected("")
                    }}
                    style={{
                        fontSize: "1.2rem"
                    }}
                >
                    Thông tin cá nhân
                </li>
                <li className={`text-start p-2 fw-bold ${getFormatSelectMenu("BILL")}`}
                    onClick={() => {
                        props.onSelected("BILL")
                    }}
                    style={{
                        fontSize: "1.2rem"
                    }}
                >
                    Danh sách hóa đơn
                </li>
            </ul>
        </Card>
    );
};

export default ProfileMenu;
