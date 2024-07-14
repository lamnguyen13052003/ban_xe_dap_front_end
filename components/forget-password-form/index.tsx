import React, {useEffect} from 'react';
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {setTitle} from "../../slice/signTitle.slice";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {saveId} from "../../slice/auth.slice";
import axiosHttp from "../../utils/axiosHttp";

interface IFormForgetPassword {
    username: string
}

function ForgetPassword() {
    document.title = "Quên mật khẩu";
    const dispatch = useDispatch();
    const nav = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<IFormForgetPassword>();

    const onSubmit = (form: IFormForgetPassword) => {
        const promise = async () => {
            return axiosHttp.request({
                url: "/api/auth/forget-password",
                method: "POST",
                data: form,
            })
        }

        toast.promise(promise, {
            pending: "Promise is pending",
            success: {
                render({data}) {
                    return data.data.message
                },
                autoClose: 1000,
                onClose: () => {
                    nav("/reset-password")
                },
            },
            error: {
                render: ({data}) => {
                    // @ts-ignore
                    const response = data.response.data
                    return `${response.message}`
                }
            }
        }).then(response => {
            dispatch(saveId(response.data.data._id))
        })
    }

    useEffect(() => {
        dispatch(setTitle({title: "Quên mật khẩu"}))
    }, []);

    return (
        <form className={"p-3 d-flex flex-column w-100 align-items-center gap-3"}
              method={"POST"}
              onSubmit={handleSubmit(onSubmit)}
        >
            <TextField id="outlined-basic"
                       {...register("username", {
                           required: "Tên đăng nhập không được để trống"
                       })}
                       className={"w-100"} type={"text"} label="Tên đăng nhập"
                       error={!!errors.username}
                       helperText={errors.username?.message}
                       variant="outlined"/>
            <Button style={{
                width: "30%"
            }} type={"submit"} variant="contained" color="success">Tìm kiếm tài khoản</Button>
        </form>
    );
}

export default ForgetPassword;