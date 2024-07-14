import {Avatar, Box, Grid, IconButton, Stack, TextField, Tooltip} from "@mui/material";
import {green, grey, pink} from "@mui/material/colors";
import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import {ArrowOutward, Cancel, Delete, Edit} from "@mui/icons-material";
import {formatDateTimeVN} from "../../utils/Formatter";
import HoverRating from "../hover-rating";
import {ObjectId} from "mongodb";
import {ReviewProductResponseType} from "../../types/reviewProductResponse.type";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {Button, Modal} from "react-bootstrap";
import {toast} from "react-toastify";
import axiosHttp from "../../utils/axiosHttp";
import {AxiosError, AxiosResponse} from "axios";
import {ResponseApi} from "../../types/response.type";
import {deleteReview, updateReview} from "../../slice/reviewProduct.slice";
import {ReviewProductType} from "../../types/reviewProduct.type";

export type DisplayUserReviewProps = {
    review: ReviewProductResponseType,
    userId?: ObjectId,
}

type TitleModelType = "Bạn có chắc muốn xóa đánh giá này không?" |
    "Bạn có chắc muốn cập nhật đánh giá này không?"

export default function DisplayUserReview(props: DisplayUserReviewProps) {
    const dispatch = useDispatch();
    const [titleModal, setTitleModal] = useState<TitleModelType>("Bạn có chắc muốn xóa đánh giá này không?");
    const [showModelConfirmDeleteReview, setShowModelConfirmDeleteReview] = useState(false);
    const handleCloseModelConfirmDeleteReview = () => setShowModelConfirmDeleteReview(false);
    const handleShowModelConfirmDeleteReview = () => setShowModelConfirmDeleteReview(true);
    const [rating, setRating] = useState<number>(props.review.rating)
    const [editStatus, setEditStatus] = useState<boolean>(false)
    const {register, getValues, setValue, formState: {errors}} = useForm<ReviewProductType>({
        defaultValues: {
            _id: props.review._id,
            rating: rating,
            comment: props.review.comment,
            userId: props.userId
        }
    });

    const onSubmitDelete = (_id: ObjectId) => {
        toast.promise<AxiosResponse<ResponseApi<boolean>>, AxiosError<string>, any>(
            axiosHttp.delete<string, AxiosResponse<ResponseApi<boolean>>, any>(`/api/reviews/delete/${props.userId}/${props.review._id}`),
            {
                pending: 'Đang xóa...',
                success: {
                    render: function ({data}) {
                        handleCloseModelConfirmDeleteReview()
                        dispatch(deleteReview(_id))
                        return 'Xóa thành công!'
                    }
                },
                error: {
                    render({data: {response}}) {
                        return response?.data ?? "Xóa thất bại!"
                    }
                }
            }
        ).then(() => {
        })
    }

    const onSubmitUpdateReview = (data: ReviewProductType) => {
        if (!data.comment) {
            errors.comment = {
                ref: undefined,
                root: undefined,
                type: "required",
                types: undefined,
                message: "Vui lòng nhập nội dung đánh giá"
            }
            handleCloseModelConfirmDeleteReview()
            return
        }
        data.rating = rating
        toast.promise<AxiosResponse<ResponseApi<ReviewProductResponseType>>, AxiosError<string>, any>(
            axiosHttp.put<ResponseApi<ReviewProductResponseType>, AxiosResponse<ResponseApi<ReviewProductResponseType>, ReviewProductType>, ReviewProductType>(`/api/reviews/update`, data),
            {
                pending: 'Đang cập nhật...',
                success: {
                    render: function ({data}) {
                        const review = data.data?.data;
                        if (review) {
                            console.log(review)
                            setEditStatus(false)
                            handleCloseModelConfirmDeleteReview()
                            dispatch(updateReview(review))
                            setValue("comment", review.comment)
                            return 'Cập nhật thành công!'
                        }
                    }
                },
                error: {
                    render({data: {response}}) {
                        console.log(response)
                        return response?.data ?? "Cập nhật thất bại!"
                    }
                }
            }
        ).then(() => {
        })
    }

    return (
        <>
            <Grid className={'p-2 my-3 rounded rounded-4 '} container sx={{backgroundColor: grey[200]}}>
                <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
                    <Stack direction={'row'} gap={2} alignItems={"center"}>
                        <Avatar alt={props.review.fullName} src={props.review.avatar} className={'m-auto'}
                                sx={{backgroundColor: green[500]}}></Avatar>
                        <Box className={'fw-bold'}>{props.review.fullName}</Box>
                    </Stack>
                    <Stack direction={'column'} alignItems={"end"}>
                        {!editStatus ?
                            <Box><Rating name="read-only" value={props.review.rating} readOnly/></Box> :
                            <HoverRating positionLabel={"left"} onClick={(rating) => setRating(rating)}
                                         rating={props.review.rating}/>
                        }
                        <Box className={'text-body-secondary'}>{formatDateTimeVN(new Date(props.review.date))}</Box>
                    </Stack>
                </Stack>
                <Grid className={'p-2 rounded rounded-3'} item xs={12} sx={{backgroundColor: grey[50]}}>
                    {!editStatus ?
                        <Typography>{props.review.comment}</Typography> :
                        <TextField
                            label="Đánh giá của bạn"
                            multiline
                            rows={4}
                            variant="filled"
                            fullWidth
                            {...register(
                                "comment",
                                {
                                    required: "Vui lòng nhập nội dung đánh giá"
                                }
                            )}
                            error={!!errors.comment}
                            helperText={errors.comment?.message}
                        />
                    }
                </Grid>
                {(props.review._id && props.review.userId === props.userId) &&
                    <>
                        <Grid className={'text-end'} item xs={12}>
                            {editStatus &&
                                <Tooltip onClick={() => {
                                    setTitleModal("Bạn có chắc muốn cập nhật đánh giá này không?")
                                    handleShowModelConfirmDeleteReview();
                                }} className={'hiding'} title="Cập nhật" placement={'bottom'}>
                                    <IconButton>
                                        <ArrowOutward color={'info'}/>
                                    </IconButton>
                                </Tooltip>
                            }
                            <Tooltip title="Chỉnh sửa" placement={'bottom'}>
                                <IconButton onClick={() => {
                                    setEditStatus(!editStatus)
                                }}>
                                    {
                                        editStatus
                                            ? <Cancel color={'error'}/>
                                            : <Edit color={'primary'}/>
                                    }
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa" placement={'bottom'}>
                                <IconButton
                                    onClick={() => {
                                        setTitleModal("Bạn có chắc muốn xóa đánh giá này không?")
                                        handleShowModelConfirmDeleteReview()
                                    }}
                                >
                                    <Delete sx={{color: pink[500]}}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Modal
                            show={showModelConfirmDeleteReview}
                            onHide={handleCloseModelConfirmDeleteReview}
                            centered={true}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>{titleModal}</Modal.Title>
                            </Modal.Header>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModelConfirmDeleteReview}>
                                    Hủy
                                </Button>
                                <Button variant="primary"
                                        onClick={() => {
                                            editStatus ?
                                                onSubmitUpdateReview(getValues()) :
                                                onSubmitDelete(props.review._id)
                                        }}>
                                    Xác nhận
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                }
            </Grid>
        </>
    )

}
