import {configureStore} from '@reduxjs/toolkit'
import {signTitleReducer} from "../slice/signTitle.slice";
import {authReducer} from "../slice/auth.slice";
import productsReducer from "../slice/product.slice";
import {useDispatch} from "react-redux";
import filterReducer from "../slice/filter.slice";
import {cartReducer} from "../slice/cart.slice";
import selectFilterReducer from "../slice/selectFilter.slice";
import {payStatusReducer} from "../slice/payStatus.slice";
import reviewProductReducer from "../slice/reviewProduct.slice";

export const store = configureStore({
    reducer: {
        signTitle: signTitleReducer,
        auth: authReducer,
        product: productsReducer,
        filter: filterReducer,
        cart: cartReducer,
        payStatus: payStatusReducer,
        selectFilter: selectFilterReducer,
        reviewProduct: reviewProductReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
