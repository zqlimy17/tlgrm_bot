import React from "react";
import { Nav, Navbar } from "react-bootstrap";

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">TLGRM</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/dashboard/">Dashboard</Nav.Link>
                <Nav.Link href="/login/">Login</Nav.Link>
                <Nav.Link href="/logout/">Logout</Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default Navigation;
