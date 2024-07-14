import {CartItemType} from "../types/cartItem.type";

export  type CartState = {
    cartItems: CartItemType[];
    cartItemsPayNow: CartItemType[];
    payNow: boolean;
}