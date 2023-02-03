
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from "../../utlis/getConfig"
import { setIsLoading } from './isLoading.slice';


export const purchases = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
            const purchases = action.payload;
            return purchases;
        }

    }
})

export const getPurchasesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases/", getConfig())
        .then((res) => dispatch(setPurchases(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setPurchases } = purchases.actions;

export default purchases.reducer;
