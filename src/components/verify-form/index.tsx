import React, {useEffect} from 'react';
import {Button, Stack, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setTitle} from "../../slice/signTitle.slice";
import {useForm} from "react-hook-form";
import {VerifyRequest} from "../../requests/verify.request";
import {AxiosResponse} from "axios";
import {toast} from "react-toastify";
import {verifySuccess} from "../../slice/auth.slice";
import {useNavigate} from "react-router-dom";
import axiosHttp from "../../utils/axiosHttp";
import {ResponseApi} from "../../types/response.type";
import {RootState} from "../../configs/store";

interface InputCode {
    "field_1"?: number,
    "field_2"?: number,
    "field_3"?: number,
    "field_4"?: number,
    "field_5"?: number,
    "field_6"?: number,
}

const initialInputCode: InputCode = {
    "field_1": undefined,
    "field_2": undefined,
    "field_3": undefined,
    "field_4": undefined,
    "field_5": undefined,
    "field_6": undefined,
}

function VerifyAccount() {
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth)
    const nav = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<InputCode>({values: initialInputCode});
    const renderInput = () => {
        const keys = Object.keys(initialInputCode) as (keyof InputCode)[];
        return keys.map(key => <TextField
            type={"text"}
            key={key.toString()}
            label="*"
            style={{
                width: "50px",
            }}
            {...register(key,
                {required: "Vui lòng nhập mã xác thực"})
            }
            error={!!errors[key]}
            helperText={errors[key]?.message}
            autoComplete={"off"}
            variant="outlined"/>)
    }

    const onSubmit = (inputCode: InputCode) => {
        const verifyRequest: VerifyRequest = {
            _id: auth._id,
            verifyCode: Object.values(inputCode).join("")
        }

        const promise = axiosHttp.post<string, AxiosResponse<ResponseApi<boolean>>>("/api/auth/verify", verifyRequest)
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
        }).then(response => {
            const result = response.data.data;
            if (result)
                dispatch(verifySuccess())
        })
    }

    useEffect(() => {
        document.title = "Xác thực tài khoản"
        if (!auth._id) nav("/")
        dispatch(setTitle({title: "Xác thực tài khoản"}));
    }, []);

    return (
        <form className={"p-3 d-flex flex-column w-100 align-items-center"}
              method={"POST"}
              onSubmit={handleSubmit(onSubmit)}
        >
            <TextField hidden={true} name={"email"} id="outlined-basic" type={"email"}/>
            <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
                {renderInput()}
            </Stack>
            <br/>
            <Button type={"submit"} variant="contained" color="success">
                Xác thực
            </Button>
        </form>
    );
}

export default VerifyAccount;