import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterProductHeadlineThunk, getProductThunk } from "../store/slices/product.slice";
import { filterProductCategoryThunk } from "../store/slices/product.slice";



const Home = () => {

    const dispatch = useDispatch();
    const productList = useSelector(state => state.product);
    const [categories, setCategories] = useState([]);
    const [productSearch, setProductSearch] = useState("");


    const navigate = useNavigate();

    useEffect(() => {

        dispatch(getProductThunk());

        axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories/')
            .then(res => setCategories(res.data))
    }, [])

    return (
        <div>
            <Row>
                <Col lg={3} >
                    <ListGroup className="list-group" >
                        <h1 style={{ fontSize: 20 }}>Category <hr /></h1 >
                        
                        {
                            categories.map((category) => (
                                <ListGroup.Item key={category.id}
                                    onClick={() => dispatch(filterProductCategoryThunk(category.id))} style={{ cursor: "pointer", justifyContent: "end" }}>{category.name}

                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Col>
                <Col lg={9}>
                    <br />
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search Products"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={productSearch} onChange={e => setProductSearch(e.target.value)}
                        />
                        <Button
                            onClick={() => dispatch(filterProductHeadlineThunk(productSearch))} variant="outline-secondary" id="button-addon2">
                            Search
                        </Button>
                    </InputGroup>

                    <Row xs={1} md={2} lg={3} className="g-4">

                        {productList.map(product => (

                            <Col key={product.id}>
                                <Card key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
                                    <Card.Img className="g-3"
                                        variant="top"
                                        style={{ height: 200, objectFit: "contain", paddingTop: "1rem", cursor : "pointer" }}
                                        src={product.images?.[0].url} alt="producto"
                                    />
                                    <hr />
                                    <Card.Body className='card-body'>
                                        <Card.Text>{product.brand}</Card.Text>
                                        <Card.Title>{product.title}</Card.Title>
                                        <div className='container-car-price'>
                                            <div>
                                                <Card.Text>
                                                    <b> Price: $ </b>{product.price}
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
                </Col>
            </Row>
        </div>
    );
};

export default Home;


