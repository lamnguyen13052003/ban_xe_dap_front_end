import React from 'react';
import Header from "../components/header";
import {Outlet} from "react-router";
import Footer from "../components/footer";
import {ToastContainer} from "react-toastify";

function Main() {
    return (
        <>
            <ToastContainer autoClose={1000}/>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    );
}

export default Main;