import React from "react";
import { Button, Form } from "react-bootstrap";

const PriceForm = () => {
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>From</Form.Label>
                    <Form.Control type="number"/>
                    
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>To</Form.Label>
                    <Form.Control type="number"  />
                </Form.Group>

                <Button variant="primary" type="submit">
                   Filter Price
                </Button>
            </Form>
        </div>
    );
};

export default PriceForm;