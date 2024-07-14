import {InfoPayType} from "../types/infoPay.type";

export enum PayStatusEnum {
    SUCCESS,
    FAILED
}

export type PayStatusState = {
    status?: PayStatusEnum
    infoPay?: InfoPayType
}