import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {LocalPhone} from "@mui/icons-material";
import React from "react";


function ContactButton() {
    return (
        <Link to={"/contact"} className={"position-relative"}>
            <Button sx={{
                border: '1px green solid',
                px: "28px",
                pt: "15px",
                pb: "10px",
            }}>
                <span>Liên hệ</span>
                <LocalPhone color="info"/>
            </Button>
        </Link>
    );
}

export default ContactButton;