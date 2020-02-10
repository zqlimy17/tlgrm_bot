import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import axios from "axios";

const Dashboard = () => {
    const user = useState("738282366");
    const [chat, setChat] = useState([]);
    useEffect(() => {
        console.log(user[0]);
        axios.get(`http://localhost:4040/users/${user[0]}`).then(res => {
            console.log(res);
            setChat(res.data.user_chats);
            console.log(res.data.user_chats);
        });
    }, []);
    return (
        <>
            <h1>Dashboard Goes here</h1>
            {chat.map(chat => {
                return (
                    <Link to={"/group/" + chat.chat_id}>
                        <Card style={{ width: "18rem" }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>
                                    Group Name: {chat.chat_name}
                                </Card.Title>
                                <Card.Text>
                                    Chat Size: {chat.chat_size}
                                </Card.Text>
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
