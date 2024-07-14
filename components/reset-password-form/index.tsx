import React, {useEffect} from 'react';
import {Button, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setTitle} from "../../slice/signTitle.slice";
import {useForm} from "react-hook-form";
import {ChangePasswordRequest} from "../../requests/changePassword.request";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {ResetPasswordRequest} from "../../requests/resetPassword.request";
import {RootState} from "../../configs/store";
import axiosHttp from "../../utils/axiosHttp";

function ResetPassword() {
    document.title = "Đổi mật khẩu";
    const dispatch = useDispatch();
    const nav = useNavigate();
    const auth = useSelector((state: RootState) => state.auth);

    const {register, getValues, handleSubmit, formState: {errors}} = useForm<ResetPasswordRequest>({
        defaultValues: {
            _id: auth._id
        }
    });

    const onSubmit = (form: ResetPasswordRequest) => {
        const promise = async () => {
            return axiosHttp.request({
                url: "/api/auth/reset-password",
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
                    nav("/login")
                },
            },
            error: {
                render: ({data}) => {
                    // @ts-ignore
                    const response = data.response.data
                    return `${response.message}`
                }
            }
        });
    }

    useEffect(() => {
        console.log(auth._id)
        dispatch(setTitle({title: "Đổi mật khẩu"}));
        if (!auth._id) nav("/")
    }, [])

    return (
        <form className={"p-3 d-flex flex-column w-100 align-items-center"}
              method={"POST"} action={"/reset-password"}
              onSubmit={handleSubmit(onSubmit)}
        >
            <TextField id="outlined-basic" className={"w-100"} type={"password"}
                       label="Mật khẩu"
                       {...register("newPassword",
                           {required: "Mật khẩu không được để trống"}
                       )}
                       error={!!errors.newPassword}
                       helperText={errors.newPassword?.message}
                       variant="outlined"/>
            <br/>
            <TextField id="outlined-basic" className={"w-100"}
                       type={"password"}
                       {...register("confirmPassword",
                           {
                               required: "Mật khẩu không được để trống",
                               validate: (value) => value === getValues().newPassword || "Mật khẩu không khớp"
                           }
                       )}
                       error={!!errors.confirmPassword}
                       helperText={errors.confirmPassword?.message}
                       label="Nhập lại mật khẩu"
                       variant="outlined"/>
            <br/>
            <Button className={"w-25"} type={"submit"} variant="contained" color="success">Xác nhận</Button>
        </form>
    );
}

export default ResetPassword;