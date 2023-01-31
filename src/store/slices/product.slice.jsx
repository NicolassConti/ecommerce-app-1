import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const productSlice = createSlice({
    name: 'product',
    initialState: [],
    reducers: {
        setProduct : (state, action) => {
            const product = action.payload
            return product;
        }

    }
})

export const getProductThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/products/')
        .then(res => dispatch(setProduct(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
    
}

export const filterProductCategoryThunk = (id) => dispatch => {
    dispatch(setIsLoading(true));
    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
        .then(res  => dispatch(setProduct(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const filterProductHeadlineThunk = (productSearch) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/products?title="+productSearch)
        .then(res => dispatch(setProduct(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
