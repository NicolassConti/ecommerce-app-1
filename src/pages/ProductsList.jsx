import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, CarouselItem, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCartsThunk, setCart } from "../store/slices/cart.slice";
import { filterProductCategoryThunk } from "../store/slices/product.slice";



const ProductsList = () => {

    const { id } = useParams();
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
    }, [id])

    const [cart, setCart] = useState("")

    const addCart = (id) => {

        const cart = {
            "quantity": 1,
            "productId": newProduct.id
        }
        dispatch(getCartsThunk(cart))

    }


    return (
        <div>
            <h1>{newProduct.brand}</h1>
            <Row>
                <div className='container-superior'>
                    <div className='container-image-description'>
                        <img style={{cursor : "pointer"}} src={newProduct.images?.[0].url} alt="" />
                    </div>

                    <div className='container-description'>
                        <h2>{newProduct.title}</h2>
                        <p className='p'>{newProduct.description}</p>
                        <input
                            type="text"
                            value={cart}
                            onChange={e => setCart(e.target.value)} />
                        <div className='container-button'>
                            <button className='button-input' onClick={addCart}> Add to Cart <i className='bx bxs-cart-add' ></i> </button>
                        </div>
                    </div>
                </div>

                <h3>Related Products</h3>

                <Row xs={1} md={2} lg={3} className="g-4">

                    {newList.map(newsItem => (

                        <Col key={newsItem.id}>
                            <Card key={newsItem.id} onClick={() => navigate(`/product/${newsItem.id}`)}>
                                <Card.Img className="g-3"
                                    variant="top"
                                    style={{ height: 200, objectFit: "contain", paddingTop: "1rem", cursor : "pointer" }}
                                    src={newsItem.images?.[0].url} alt="producto"
                                />
                                <Card.Body className='card-body'>
                                    <Card.Title >{newsItem.title}</Card.Title>
                                    <div className='container-car-price'>
                                        <div>
                                            <Card.Text>
                                                Price: $ {newsItem.price}
                                            </Card.Text>
                                        </div>
                                        <div className='car-container'>

                                            <i className='bx bxs-cart'></i>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                    ))}
                </Row>
            </Row>
            <br />
            <p>Showing ID Product: <b>{id}</b></p>
        </div>
    );
};

export default ProductsList;


