import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './header.css'


function Header() {
    return (

        <div>
            <Navbar expand="lg" className="header">
                <Navbar.Brand href="#" className="brand">FakeWhatsapp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className id="basic-navbar-nav">
                        <Nav.Link href="#home">Chat</Nav.Link>
                        <Nav.Link href="#about">Contatti</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Header;