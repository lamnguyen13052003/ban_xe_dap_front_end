import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartState} from "../states/cart.state";
import {ObjectId} from "mongodb";
import {CartItemType} from "../types/cartItem.type";
import {toast} from "react-toastify";

const loadCartState = () => {
    const cartString = localStorage.getItem("cart");
    if (!cartString) return {cartItems: [], cartItemsPayNow: [], payNow: false} as CartState;
    const cart = JSON.parse(cartString) as CartState;
    cart.cartItemsPayNow = [];
    cart.payNow = false;
    return cart;
}

const initial: CartState = loadCartState();

const cartSlice = createSlice({
    name: 'cart slice',
    initialState: initial,
    reducers: {
        addCartItem: function (state, payload: PayloadAction<CartItemType>) {
            const cartItem = payload.payload;
            const cartItems = state.cartItems;
            let contain = false;
            cartItems.forEach((item: CartItemType) => {
                if (item.id === cartItem.id && cartItem.type === item.type) {
                    item.quantity += cartItem.quantity;
                    contain = true
                    return;
                }
            });

            if (!contain) {
                state.cartItems.push(cartItem)
            }

            toast.success("Thêm sản phẩm thành công!")
            saveLocalStorage(state)
        },
        addCartItemPayNow: function (state, payload: PayloadAction<CartItemType>) {
            state.cartItemsPayNow.push(payload.payload)
            state.payNow = true;
            saveLocalStorage(state)
        },
        increaseQuantityCartItem: function (state, payload: PayloadAction<{ _id: ObjectId, type: string }>) {
            const cartItems = state.cartItems;
            const id = payload.payload._id;
            const type = payload.payload.type;
            cartItems.forEach((item: CartItemType) => {
                if (item.id === id && type === item.type) {
                    item.quantity++;
                    toast.success("Thêm sản phẩm thành công!")
                    saveLocalStorage(state)
                }
            });
        },
        decreaseCartItem: function (state, payload: PayloadAction<{ _id: ObjectId, type: string }>) {
            const cartItems = state.cartItems;
            const id = payload.payload._id;
            const type = payload.payload.type;
            cartItems.forEach((item: CartItemType) => {
                if (item.id === id && type === item.type) {
                    item.quantity--;
                    toast.success("Giảm sản phẩm thành công!")
                    saveLocalStorage(state)
                }
            });


        },
        removeCartItem: function (state, payload: PayloadAction<ObjectId>) {
            removeItem(state.cartItems, payload.payload);
            toast.success("Xóa sản phẩm thành công!")
            saveLocalStorage(state)
        },
        clearCart: function (state, payload: PayloadAction<void>) {
            while (state.cartItems.length) {
                state.cartItems.pop();
            }
            saveLocalStorage(state)
        },
        clearCartPayNow: function (state, payload: PayloadAction<void>) {
            while (state.cartItemsPayNow.length) {
                state.cartItemsPayNow.pop();
            }
            state.payNow = false;
            saveLocalStorage(state)
        },
        setPayNow: function (state, payload: PayloadAction<boolean>) {
            state.payNow = payload.payload;
            saveLocalStorage(state)
        },
    }
});

const removeItem = (cartItems: CartItemType[], id: ObjectId) => {
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === id) {
            cartItems.splice(i, 1);
            break;
        }
    }
}

const saveLocalStorage = (cart: CartState) => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

export const {
    addCartItem,
    removeCartItem,
    increaseQuantityCartItem,
    decreaseCartItem,
    clearCart,
    addCartItemPayNow,
    clearCartPayNow,
    setPayNow
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer