import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { filterProductCategoryThunk } from "../store/slices/product.slice";


const ProductsList = () => {

    const {id} = useParams();
    const [newProduct, setNewProduct] = useState({});

    const newList = useSelector(state => state.product);
    const navigate = useNavigate()

    const dispatch = useDispatch();

    useEffect(() => {
            axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}/`)
                .then(res => {
                    setNewProduct(res.data)
                    dispatch(filterProductCategoryThunk(res.data.category.id))
                })
    }, [ id ])

  

    return (
        <div>
            <h1><b>MARCA :</b> {newProduct.brand}</h1>
            { newList.map(newItem => (
                <li key={newItem.id} onClick={() => navigate(`/product/${newItem.id}`)} style={{cursor : "pointer"}}>
                    {newItem.title}
                </li>
            ))}
            <br />
            <br />
            <p>
                Mostrando producto de id :<b>{id}</b>
            </p>
            <img src={newProduct.images?.[0].url} alt="" style={{width : 400}}/>
            <br />
            <br />
            <p>
                <b>
                    DESCRIPCION : {newProduct.description}
                </b>
            </p>
            <p><b>PRECIO : {newProduct.price}</b></p>
        </div>
    );
};

export default ProductsList;