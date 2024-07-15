import React, {useEffect} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {setTitle} from "../../slice/signTitle.slice";
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {RegisterRequest} from "../../requests/register.request";
import {toast} from "react-toastify";
import {saveId} from "../../slice/auth.slice";
import {Col, Row} from "react-bootstrap";
import axiosHttp from "../../utils/axiosHttp";
import {AxiosResponse} from "axios";
import {ResponseApi} from "../../types/response.type";
import {UserHasPasswordType} from "../../types/userHasPassword.type";

function Register() {
    document.title = "Đăng ký tài khoản";
    const dispatch = useDispatch();
    const nav = useNavigate();

    const {register, getValues, handleSubmit, formState: {errors}} = useForm<RegisterRequest>();

    useEffect(() => {
        dispatch(setTitle({title: "Đăng ký tài khoản"}));
    }, [])

    const onSubmit: SubmitHandler<RegisterRequest> = (form) => {
        const promise = axiosHttp.post<string, AxiosResponse<ResponseApi<UserHasPasswordType>>>("/api/auth/register", form)
        toast.promise(promise, {
            pending: "Promise is pending",
            success: {
                render({data}) {
                    return data.data.message
                },
                autoClose: 5000,
                onClose: () => {
                    nav("/verify")
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
                const user: UserHasPasswordType | undefined = response.data.data;
                if (user && user._id)
                    dispatch(saveId(user._id))
            }
        );
    }

    return (
        <form className={"p-3"}
              onSubmit={handleSubmit(onSubmit)}
        >
            <Row className={"row-gap-3"}>
                <Col md={12}>
                    <TextField
                        className={"w-100"}
                        type={"text"}
                        {...register(
                            "fullName",
                            {
                                required: "Tên người dùng không được để trống",
                            }
                        )}
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                        label="Họ và tên" variant="outlined"/>
                </Col>
                <Col md={12}>
                    <TextField
                        {...register(
                            "username",
                            {
                                required: "Tên đăng nhập không được để trống",
                            }
                        )}
                        className={"w-100"}
                        type={"string"}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        label="Tên đăng nhập" variant="outlined"/>
                </Col>
                <Col md={12}>
                    <Row className={"row-gap-3"}>
                        <Col md={6}>
                            <TextField
                                {...register(
                                    "email",
                                    {
                                        required: "Email không được để trống",
                                    }
                                )}
                                className={"w-100"}
                                type={"email"}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                label="Email" variant="outlined"/>
                        </Col>
                        <Col md={6}>
                            <TextField
                                {...register(
                                    "phone",
                                    {
                                        required: "Số điện thoại không được để trống",
                                    }
                                )}
                                className={"w-100"}
                                type={"tel"}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                                label="Số điện thoại" variant="outlined"/>
                        </Col>
                    </Row>
                </Col>
                <Col md={12}>
                    <Row className={"row-gap-3"}>
                        <Col md={6}>
                            <FormControl className={"w-100"}>
                                <InputLabel>Giới tính</InputLabel>
                                <Select
                                    {...register(
                                        "gender",
                                    )}
                                    className={"w-100"}
                                    label="Giới tính"
                                    variant="outlined"
                                >
                                    <MenuItem value={undefined} hidden={true} disabled={true}>Chọn giới tính</MenuItem>
                                    <MenuItem value={"Nam"}>Nam</MenuItem>
                                    <MenuItem value={"Nữ"}>Nữ</MenuItem>
                                </Select>
                            </FormControl>
                        </Col>
                        <Col md={6}>
                            <TextField
                                {...register(
                                    "birthday",
                                    {
                                        required: "Ngày sinh không được để trống",
                                    }
                                )}
                                className={"w-100"}
                                type={"date"}
                                error={!!errors.birthday}
                                helperText={errors.birthday?.message}
                                variant="outlined"/>
                        </Col>
                    </Row>
                </Col>
                <Col md={12}>
                    <TextField
                        {...register(
                            "password",
                            {
                                required: "Mật khẩu không được để trống",
                            }
                        )}
                        className={"w-100"}
                        type={"password"}
                        label="Mật khẩu"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        variant="outlined"/>
                </Col>
                <Col md={12}>
                    <TextField
                        {...register(
                            "confirmPassword",
                            {
                                required: "Mật khẩu nhật lại không được để trống",
                                validate: (value) => value === getValues().password || "Mật khẩu không khớp"
                            }
                        )}
                        className={"w-100"}
                        type={"password"}
                        label="Nhập lại mật khẩu"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        variant="outlined"/>
                </Col>
            </Row>
            <Row className={"mt-3 justify-content-center"}>
                <Col lg={4} md={12} className={""}>
                    <Button className={"w-100"}
                            type={"submit"}
                            variant="contained"
                            color="success">
                        Đăng ký
                    </Button>
                </Col>
            </Row>
            <Row className={"mt-3 justify-content-center"}>
                <Col className={"text-center"}>
                    <Link to={"/login"}
                          className={"text-decoration-none"}>
                        Đã có tài khoản?
                    </Link>
                </Col>
            </Row>
        </form>
    );
}

export default Register;