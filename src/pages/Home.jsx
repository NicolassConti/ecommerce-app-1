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
                <Col lg={3}>
                    <ListGroup>
                        {
                            categories.map((category) => (
                                <ListGroup.Item key={category.id}
                                    onClick={() => dispatch(filterProductCategoryThunk(category.id))} style={{ cursor: "pointer" }}>{category.name}

                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Col>
                <Col lg={9}>
                    <h1>Home</h1>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={productSearch} onChange={e => setProductSearch(e.target.value)}
                        />
                        <Button
                            onClick={() => dispatch(filterProductHeadlineThunk(productSearch))} variant="outline-secondary" id="button-addon2">
                            Button
                        </Button>
                    </InputGroup>
                    <ul>
                        <Row xs={1} md={2} className="g-4">
                            {productList.map((product) => (
                                <li key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
                                    <Col>
                                        <Card >
                                            <Card.Img className="img-product" variant="top" src={product.images[0]?.url} style={{ width: 300 , height: 300 , objectFit: "contain" }}  />
                                            <Card.Body>
                                                <Card.Title>{product.title}</Card.Title>
                                                <Card.Text>

                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </li>
                            ))}
                        </Row>
                    </ul>
                </Col>
            </Row>
        </div>
    );
};

export default Home;