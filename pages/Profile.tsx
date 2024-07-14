import React from "react";
import {Col, Container, Row} from 'react-bootstrap';
import ProfileMenu from "../components/profile/profileMenu";
import ProfileForm from "../components/profile/personalInfo";

const ProfilePage: React.FC = () => {
    return (
        <Container>
            <Row className={"justify-content-between"}>
                <Col sm={3}>
                    <ProfileMenu/>
                </Col>
                <Col sm={9}>
                    <ProfileForm/>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
