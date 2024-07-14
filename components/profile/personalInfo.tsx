import React, {useEffect, useState} from "react";
import {Button, Card, Col, Form, Modal, Row} from 'react-bootstrap';
import {Stack} from "@mui/material";
import {useForm} from "react-hook-form";
import {ObjectId} from "mongodb";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../configs/store";
import {User} from "../../types/user.type";
import axiosHttp from "../../utils/axiosHttp";
import {AxiosResponse} from "axios";
import {ResponseApi} from "../../types/response.type";
import {toast} from "react-toastify";
import {updateProfile} from "../../slice/auth.slice";

type changePasswordForm = {
    _id?: ObjectId
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

function ProfileForm() {
    const user: User | undefined = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {
        register: registerChangePassword,
        getValues: getValuesChangePassword,
        setValue: setValueChangePassword,
        handleSubmit: handleSubmitChangePassword,
        formState: {errors: errorsChangePassword}
    } = useForm<changePasswordForm>({
        values: {
            _id: user?._id
        }
    });
    const {
        register: registerUpdateProfile,
        handleSubmit: handleSubmitUpdateProfile,
        formState: {errors: errorsUpdateProfile}
    } = useForm<User>(
        {
            values: {
                _id: user?._id,
                fullName: user?.fullName,
                birthday: user?.birthday,
                gender: user?.gender,
                email: user?.email,
                phone: user?.phone,
            }
        }
    );
    const onSubmitChangePassword = (data: changePasswordForm) => {
        const promise = axiosHttp.put<string, AxiosResponse<ResponseApi<User>>>("/api/user/change-password", data)
        toast.promise(promise, {
            pending: "Promise is pending",
            success: {
                render({data}) {
                    return data.data.message
                },
                autoClose: 1000,
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
            if (!result)
                return;
            handleClose();
            setValueChangePassword("currentPassword", "")
            setValueChangePassword("newPassword", "")
            setValueChangePassword("confirmPassword", "")
        })
    }
    const onSubmitUpdateProfile = (data: User) => {
        const promise = axiosHttp.put<string, AxiosResponse<ResponseApi<User>>>("/api/user/update-profile", data)
        toast.promise(promise, {
            pending: "Promise is pending",
            success: {
                render({data}) {
                    return data.data.message
                },
                autoClose: 1000,
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
            if (!result)
                return;
            dispatch(updateProfile(result))
        })
    }

    useEffect(() => {
        if (!user)
            nav("/login")
    }, [user])

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">Thông tin cá nhân</h5>
                <Form onSubmit={handleSubmitUpdateProfile(onSubmitUpdateProfile)}>
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group controlId="firstName" className={"position-relative"}>
                                <Form.Label>Họ và tên</Form.Label>
                                <Form.Control type="text"
                                              placeholder="Họ và tên của bạn"
                                              {...registerUpdateProfile(
                                                  "fullName",
                                                  {
                                                      required: "Vui lòng nhập họ và tên",
                                                  }
                                              )}
                                              isInvalid={!!errorsUpdateProfile.fullName}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errorsUpdateProfile.fullName?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="birthday" className={"position-relative"}>
                                <Form.Label>Ngày sinh</Form.Label>
                                <Form.Control type="date"
                                              {...registerUpdateProfile(
                                                  "birthday",
                                                  {
                                                      required: "Vui lòng nhập ngày sinh"
                                                  }
                                              )}
                                              isInvalid={!!errorsUpdateProfile.birthday}/>
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errorsUpdateProfile.birthday?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="gender" className={"position-relative"}>
                                <Form.Label>Giới tính</Form.Label>
                                <Form.Select
                                    {...registerUpdateProfile(
                                        "gender",
                                        {
                                            required: "Vui lòng chọn giới tính"
                                        }
                                    )}
                                    isInvalid={!!errorsUpdateProfile.gender}
                                >
                                    <option value="">Chọn giới tính</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Nam">Nam</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errorsUpdateProfile.gender?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="email" className={"position-relative"}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Email của bạn"
                                    {...registerUpdateProfile(
                                        "email",
                                        {
                                            required: "Vui lòng nhập email",
                                        }
                                    )}
                                    isInvalid={!!errorsUpdateProfile.email}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errorsUpdateProfile.email?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="phoneNumber" className={"position-relative"}>
                                <Form.Label>Số điện thọại</Form.Label>
                                <Form.Control type="text"
                                              placeholder="Số điện thọại của bạn"
                                              {...registerUpdateProfile(
                                                  "phone",
                                                  {
                                                      required: "Vui lòng nhập số điện thoại",
                                                      pattern: {
                                                          value: /^[0-9]{10}$/,
                                                          message: "Số điện thoại không hợp lệ"
                                                      }
                                                  }
                                              )}
                                              isInvalid={!!errorsUpdateProfile.phone}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errorsUpdateProfile.phone?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Stack gap={2} direction={"row"}>
                        <Button variant="primary" type="submit">Lưu thay đổi</Button>
                        <Button type={"button"} onClick={handleShow}>Đổi mật khẩu</Button>
                    </Stack>
                </Form>
            </Card.Body>

            <Modal show={show}
                   onHide={handleClose}
                   backdrop="static"
                   keyboard={false}
                   centered={true}
            >
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Đổi mật khẩu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="currentPassword" className={"position-relative"}>
                            <Form.Label>Mật khẩu hiện tại</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Mật khẩu hiện tại"
                                {...registerChangePassword(
                                    "currentPassword",
                                    {
                                        required: "Vui lòng nhập mật khẩu hiện tại"
                                    }
                                )}
                                isInvalid={!!errorsChangePassword.currentPassword}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errorsChangePassword.currentPassword?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="newPassword" className={"position-relative"}>
                            <Form.Label>Mật khẩu mới</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Mật khẩu mới"
                                {...registerChangePassword(
                                    "newPassword",
                                    {
                                        required: "Vui lòng nhập mật khẩu mới"
                                    }
                                )}
                                isInvalid={!!errorsChangePassword.newPassword}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errorsChangePassword.newPassword?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="confirmPassword" className={"position-relative"}>
                            <Form.Label>Xác nhận mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Xác nhận mật khẩu"
                                {...registerChangePassword(
                                    "confirmPassword",
                                    {
                                        required: "Vui lòng nhập lại mật khẩu mới",
                                        validate: value => value === getValuesChangePassword().newPassword || "Mật khẩu không khớp"
                                    }
                                )}
                                isInvalid={!!errorsChangePassword.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errorsChangePassword.confirmPassword?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Hủy
                        </Button>
                        <Button variant="primary" type={"submit"}
                                onClick={handleSubmitChangePassword(onSubmitChangePassword)}>
                            Lưu
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Card>
    );
}

export default ProfileForm;
