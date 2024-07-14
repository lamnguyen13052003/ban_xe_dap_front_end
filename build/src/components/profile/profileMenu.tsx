import React from "react";
import {Card, Button} from 'react-bootstrap';
import Avatar from "../../assets/images/profile/me.png";
import AvatarBackGround from "../../assets/images/profile/back-ground.png";

function ProfileMenu() {
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
        </Card>
    );
};

export default ProfileMenu;
