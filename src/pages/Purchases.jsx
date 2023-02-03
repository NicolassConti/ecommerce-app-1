import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPurchasesThunk } from "../store/slices/purchases.slice";

const Purchases = () => {

    const purchases = useSelector(state => state.purchases);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, [])

    

    return (
        <div>
           
        <h1>My Purchases</h1>
            <Row xs={1} md={2} lg={3} className="g-4">

                {purchases.map(news => (

                    <Col key={news.id}>
                        <Card key={news.id} onClick={() => navigate(`/product/${news.id}`)}>
                          
                            <Card.Img className="g-3"
                                variant="top"
                                style={{ height: 200, objectFit: "contain", paddingTop: "1rem" }}
                                src={news.product.images?.[0].url} alt="producto"
                            />
                            <Card.Body className='card-body'>
                                <Card.Title >{news.product.title}</Card.Title>
                                <div className='container-car-price'>
                                    <div>
                                        <Card.Text>
                                            Price: $ {news.product.price}
                                        </Card.Text>
                                    </div>
                                   
                                </div>
                            </Card.Body>
                            {/* </Link> */}
                        </Card>
                    </Col>

                ))}
            </Row>
        </div>
    );
};

export default Purchases;
