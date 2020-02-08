import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const Dashboard = () => {
    const [groups, setGroups] = useState([
        { name: "Sample Group 1", count: 23, id: 123 },
        { name: "General Assembly", count: 20, id: 5142 }
    ]);
    useEffect(() => {}, []);
    return (
        <>
            <h1>Dashboard Goes here</h1>
            {groups.map(group => {
                return (
                    <Link to={"/groups/" + group.id}>
                        <Card style={{ width: "18rem" }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>{group.name}</Card.Title>
                                <Card.Text>{group.count}</Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Link>
                );
            })}
        </>
    );
};

export default Dashboard;
