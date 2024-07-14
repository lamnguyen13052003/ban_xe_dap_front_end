import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import FilterAttributeType from "../types/filterAttribute.type";

const initialFilterState: FilterAttributeType = {
    brands: [],
    prices: {min: 0, max: 0},
    wheelSizes: [],
    materials: [],
    targetUsings: [],
    additional: ''
}

const selectFilterSlice = createSlice({
    name: 'filter',
    initialState: initialFilterState,
    reducers: {
        setDataBrandFilter: (state, action: PayloadAction<string[]>) => {
            state.brands = action.payload
        },
        setDataWheelSizeFilter: (state, action: PayloadAction<string[]>) => {
            state.wheelSizes = action.payload
        },
        setDataMaterialFilter: (state, action: PayloadAction<string[]>) => {
            state.materials = action.payload
        },
        setDataTargetUsingFilter: (state, action: PayloadAction<string[]>) => {
            state.targetUsings = action.payload
        },
        setDataPriceFilter: (state, action: { payload: { min: number, max: number } }) => {
            state.prices = action.payload
        },
        setDataAdditionalFilter: (state, action: PayloadAction<string>) => {
            state.additional = action.payload

        }
    }
})
export const {
    setDataBrandFilter,
    setDataTargetUsingFilter,
    setDataMaterialFilter,
    setDataWheelSizeFilter,
    setDataPriceFilter,
    setDataAdditionalFilter
} = selectFilterSlice.actions
const selectFilterReducer = selectFilterSlice.reducer;
export default selectFilterReducer;
