import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ProductType} from "../types/product.type"
import axiosHttp from "../utils/axiosHttp";
import {AxiosResponse} from "axios";
import {ResponseApi} from "../types/response.type";
import {ProductHasTotalType} from "../types/productsHasTotal.type";

interface HomeState {
    bestSale: ProductType[],
    newProduct: ProductType[],
    babyBicycle: {
        category: string,
        products: ProductType[],
        total: number
    },
    sportBicycle: {
        category: string,
        products: ProductType[],
        total: number
    },
    topographicBicycle: {
        category: string,
        products: ProductType[],
        total: number
    },
    racingBicycle: {
        category: string,
        products: ProductType[],
        total: number
    },
    touringBicycle: {
        category: string,
        products: ProductType[],
        total: number
    },
    femaleBicycle: {
        category: string,
        products: ProductType[],
        total: number
    },
    foldBicycle: {
        category: string,
        products: ProductType[],
        total: number
    },
}

const initialState: HomeState = {
    bestSale: [],
    newProduct: [],
    babyBicycle: {
        category: "Xe đạp trẻ em",
        products: [],
        total: 0
    },
    sportBicycle: {
        category: "Xe đạp thể thao",
        products: [],
        total: 0
    },
    topographicBicycle: {
        category: "Xe đạp địa hình",
        products: [],
        total: 0
    },
    racingBicycle: {
        category: "Xe đạp đua",
        products: [],
        total: 0
    },
    touringBicycle: {
        category: "Xe đạp touring",
        products: [],
        total: 0
    },
    femaleBicycle: {
        category: "Xe đạp nữ",
        products: [],
        total: 0
    },
    foldBicycle: {
        category: "Xe đạp gấp",
        products: [],
        total: 0
    },
}

export const getProductsByCategory = createAsyncThunk('products/getProducts/category', async (prop: {
    category: number,
    page: number | undefined
}, thunkAPI) => {
    const [response] = await Promise.all([axiosHttp.get<any, AxiosResponse<ResponseApi<ProductHasTotalType>>, any>(`api/products/${prop.category}/page=${prop.page}`, {
        signal: thunkAPI.signal
    })])
    return {
        category: prop.category,
        data: response.data.data
    }
})
export const getProductsByBestSale = createAsyncThunk('products/getProducts/hasBestSale', async (bestSale: boolean, thunkAPI) => {
    const response = await axiosHttp.get<any, AxiosResponse<ResponseApi<ProductType[]>>, any>(`api/products/best-sale/${bestSale}`, {
        signal: thunkAPI.signal
    })

    return {
        bestSale,
        data: response.data.data
    }
})

export const getProductsByFilter = createAsyncThunk('products/getProducts/filter', async (prop: {
    category: number
    page: number | undefined
    queryParams: string

}, thunkAPI) => {
    try{
        const response = await axiosHttp.get<any, AxiosResponse<ResponseApi<ProductHasTotalType>>, any>(`api/products/${prop.category}/page=${prop.page}/filter?${prop.queryParams}`, {
            signal: thunkAPI.signal
        })

        return {
            category: prop.category,
            data: response.data.data
        }
    }catch (e : any ) {
       return thunkAPI.rejectWithValue(e.response?.data || e.message)
    }

})

const productSlice = createSlice({
    name: 'product slice',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getProductsByCategory.fulfilled, (state, action) => {
            if (!action.payload.data) return
            switch (action.payload.category) {
                case 0:
                    state.babyBicycle.products = action.payload.data.products
                    state.babyBicycle.total = action.payload.data.total
                    break
                case 1:
                    state.sportBicycle.products = action.payload.data.products
                    state.sportBicycle.total = action.payload.data.total
                    break
                case 2:
                    state.topographicBicycle.products = action.payload.data.products
                    state.topographicBicycle.total = action.payload.data.total
                    break
                case 3:
                    state.racingBicycle.products = action.payload.data.products
                    state.racingBicycle.total = action.payload.data.total
                    break
                case 4:
                    state.touringBicycle.products = action.payload.data.products
                    state.touringBicycle.total = action.payload.data.total
                    break
                case 5:
                    state.femaleBicycle.products = action.payload.data.products
                    state.femaleBicycle.total = action.payload.data.total
                    break
                case 6:
                    state.foldBicycle.products = action.payload.data.products
                    state.foldBicycle.total = action.payload.data.total
                    break
                default:
                    break
            }
        })
            .addCase(getProductsByBestSale.fulfilled, (state, action) => {
                if (!action.payload.data) return
                if (action.payload.bestSale) {
                    state.bestSale = action.payload.data
                } else {
                    state.newProduct = action.payload.data
                }
            })
            .addCase(getProductsByFilter.fulfilled, (state, action) => {
                if (!action.payload.data) return
                switch (action.payload.category) {
                    case 0:
                        state.babyBicycle.products = action.payload.data.products
                        state.babyBicycle.total = action.payload.data.total
                        break
                    case 1:
                        state.sportBicycle.products = action.payload.data.products
                        state.sportBicycle.total = action.payload.data.total
                        break
                    case 2:
                        state.topographicBicycle.products = action.payload.data.products
                        state.topographicBicycle.total = action.payload.data.total
                        break
                    case 3:
                        state.racingBicycle.products = action.payload.data.products
                        state.racingBicycle.total = action.payload.data.total
                        break
                    case 4:
                        state.touringBicycle.products = action.payload.data.products
                        state.touringBicycle.total = action.payload.data.total
                        break
                    case 5:
                        state.femaleBicycle.products = action.payload.data.products
                        state.femaleBicycle.total = action.payload.data.total
                        break
                    case 6:
                        state.foldBicycle.products = action.payload.data.products
                        state.foldBicycle.total = action.payload.data.total
                        break
                    default:
                        break
                }
            })
    }
})
const productsReducer = productSlice.reducer
export default productsReducer
