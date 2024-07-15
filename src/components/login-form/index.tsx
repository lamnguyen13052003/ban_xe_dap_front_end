import React from 'react';
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {setTitle} from "../../slice/signTitle.slice";
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form"
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {User} from "../../types/user.type";
import {login, saveId} from "../../slice/auth.slice";
import {LoginRequest} from "../../requests/login.request";
import axiosHttp from "../../utils/axiosHttp";
import {AxiosResponse} from "axios";
import {ResponseApi} from "../../types/response.type";

function Login() {
    document.title = "Đăng nhập tài khoản"
    const dispatch = useDispatch();
    dispatch(setTitle({title: "Đăng nhập tài khoản"}))
    const nav = useNavigate();

    const loginHandle = async (data: LoginRequest) => {
        return axiosHttp.post("/login", data)
    }


    const {register, handleSubmit, formState: {errors}} = useForm<LoginRequest>()
    const onSubmit: SubmitHandler<LoginRequest> = (form) => {
        const promise = axiosHttp.post<string, AxiosResponse<ResponseApi<User>, any>, any>("/api/auth/login", form)
        toast.promise(promise, {
            pending: "Promise is pending",
            success: {
                render({data}) {
                    const user = data.data.data;
                    return `Xin chào ${user?.fullName}`
                },
                autoClose: 1000,
                onClose: () => {
                    nav("/")
                },
            },
            error: {
                render: ({data}) => {
                    // @ts-ignore
                    const response = data.response.data
                    const code = response.code;
                    if (code == 401) {
                        setTimeout(() => {
                            dispatch(saveId(response.data))
                            nav("/verify")
                        }, 1000);
                    }
                    return `${response.message}`
                }
            }
        }).then((response) => {
            const user = response.data.data;
            if (user)
                dispatch(login(user))
        });
    }

    return (
        <form className={"p-3 d-flex flex-column w-100 align-items-center gap-3"}
              method={"POST"}
              onSubmit={handleSubmit(onSubmit)}
        >
            <TextField
                className={"w-100"}
                type={"text"}
                {...register(
                    "username",
                    {
                        required: "Tên đăng nhập không được để trống",
                    }
                )}
                error={!!errors.username}
                helperText={errors.username?.message}
                label="Tên đăng nhập"
                variant="outlined"/>
            <TextField
                className={"w-100"}
                type={"password"}
                {...register(
                    "password",
                    {
                        required: "Mật khẩu không được để trống",
                    },
                )}
                label={"Mật khẩu"}
                error={!!errors.password}
                helperText={errors.password?.message}
                variant="outlined"/>
            <Button type={"submit"} variant="contained" color="success">
                Đăng nhập
            </Button>
            <Link to={"/forget-password"} className={"text-decoration-none mt-3"}>Quên mật khẩu?</Link>
        </form>
    );
}

export default Login;