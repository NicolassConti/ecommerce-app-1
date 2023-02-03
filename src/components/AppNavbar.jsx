import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PurchasesSidebar from "./PurchasesSidebar"

const AppNavbar = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("token", "")
    navigate("/login")
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar expand="lg" variant="dark" bg="primary">
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ fontSize: 25, }}>E-commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/login" style={{ fontSize: 20 }} ><i className='bx bxs-user'></i></Nav.Link>
              <Nav.Link as={Link} to="/product/id" style={{ fontSize: 20 }}>Product Detail</Nav.Link>
              <Nav.Link as={Link} to="/purchases" style={{ fontSize: 20 }}>Purchases</Nav.Link>
              <Nav.Link onClick={logout} style={{ fontSize: 20 }}>Log out <i class='bx bx-log-out'></i></Nav.Link>
              <Nav.Link onClick={handleShow} style={{ fontSize: 20 }}><i className='bx bxs-cart'></i></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <PurchasesSidebar show={show} handleClose={handleClose} />
    </>
  );
};

export default AppNavbar;