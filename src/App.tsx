import React from 'react';
import './styles/App.css';
import {Route, Routes} from "react-router";
import Main from "./layouts/Main";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-submenu/dist/index.css";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import Sign from "./pages/Sign";
import Login from "./components/login-form";
import Register from "./components/register-form";
import ForgetPassword from "./components/forget-password-form";
import ResetPassword from "./components/reset-password-form";
import VerifyAccount from "./components/verify-form";
import {ProductDetail} from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Pay from "./pages/Pay";
import Profile from "./pages/Profile";
import ShoppingGuide from "./pages/ShoppingGuide";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Main/>}>
                <Route index element={<Home/>}/>
                <Route path={"/cart"} element={<Cart/>}/>
                <Route element={<Sign/>}>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/register"} element={<Register/>}/>
                    <Route path={"/forget-password"} element={<ForgetPassword/>}/>
                    <Route path={"/reset-password"} element={<ResetPassword/>}/>
                    <Route path={"/verify"} element={<VerifyAccount/>}/>
                </Route>
                <Route path={"/:category/page/:page"} element={<Products />}/>
                <Route path="/:category/page/:page/filter" element={<Products />} />
                <Route path={"/product/:name"} element={<ProductDetail/>}/>
                <Route path={"/contact"} element={<Contact/>}/>
                <Route path={"/checkout"} element={<Checkout/>}/>
                <Route path={"/pay"} element={<Pay/>}/>
                <Route path={"/profile"} element={<Profile/>} />
                <Route path={"/shopping-guide"} element={<ShoppingGuide/>} />
            </Route>
        </Routes>
    );
}

export default App;
