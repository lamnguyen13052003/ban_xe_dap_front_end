import {InfoPayType} from "../types/infoPay.type";
import {BillItemType} from "../../backend/types/billItem.type";

export type PayRequest = {
    infoPay: InfoPayType,
    products: BillItemType[]
}