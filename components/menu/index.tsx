import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {DropdownSubmenu, MenuItem, NavDropdownMenu} from "react-bootstrap-submenu";
import {Box} from "@mui/material";

function Menu() {
    return (
        <Box>
            <Navbar collapseOnSelect>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto bg-primary rounded-2">
                        <NavDropdownMenu title="Danh sách sản phẩm" id="collasible-nav-dropdown"
                                         className={`px-2 fw-bold`}>
                            <MenuItem href={'/xe-dap-tre-em/page/1'}>Xe đạp trẻ em </MenuItem>
                            <MenuItem href={'/xe-dap-the-thao/page/1'}>Xe đạp thẻ thao </MenuItem>
                            <MenuItem href={'/xe-dap-dia-hinh/page/1'}>Xe đạp địa hình </MenuItem>
                            <MenuItem href={'/xe-dap-dua/page/1'}>Xe đạp đua </MenuItem>
                            <MenuItem href={'/xe-dap-touring/page/1'}>Xe đạp touring </MenuItem>
                            <MenuItem href={'/xe-dap-nu/page/1'}>Xe đạp nữ </MenuItem>
                            <MenuItem href={'/xe-dap-gap/page/1'}>Xe đạp gấp </MenuItem>
                           {/* <DropdownSubmenu href="#action/3.7" title="Text to show">
                                <MenuItem>Sub 1</MenuItem>
                                <DropdownSubmenu href="#action/3.7" title="Text to show">
                                    <MenuItem>Sub 2</MenuItem>
                                </DropdownSubmenu>
                            </DropdownSubmenu>*/}
                        </NavDropdownMenu>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Box>
    );
}

export default Menu;
