import React, { useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk, purchasesCartThunk } from "../store/slices/cart.slice";
import { useState } from "react";

const PurchasesSidebar = ({ show, handleClose }) => {

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();

    const[counter, setCounter] = useState (1)


    useEffect(() => {
        dispatch(getCartThunk());
    }, [])

    console.log(cart)
    const increment = () =>{
      setCounter(counter+1)
    }
    const decrement = () =>{
      setCounter (counter -1)
    }
    
        
    return (
        <Offcanvas placement="end" show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>My Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul>
                    {
                        cart.map(carts => (
                            <li key={carts.id} style={{listStyle : "none"}}>
                               <img src={carts.product.images[0].url} alt="" style={{width: 150}} />
                                <br />
                                <br />
                                <b>
                                {carts.product.title}
                                </b>                        
                               <br />
                               <br />
                               <hr />
                               <span>
                                  Quantity :  <button onClick={decrement} disabled={counter==1}> - </button> <button> {counter} </button> <button onClick={increment}> +</button>
                               </span>
                               <br />
                               <br />
                               <hr />
                                <p><b>Total $ : </b>{carts.product.price}</p>
                           
                            </li>
                        ))
                    }
                </ul>
                <Button onClick={() => dispatch(purchasesCartThunk())}>CheckOut <i class='bx bxs-check-circle' style={{fontSize: 20}}></i></Button>
            </Offcanvas.Body>
        </Offcanvas>
    );

};


export default PurchasesSidebar;

