import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { HashLoader } from "react-spinners";

const Dashboard = () => {
    const user = useState("738282366");
    const [chats, setChats] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:4040/users/${user[0]}`).then(res => {
            console.log(res);
            setChats(res.data.user_chats);
            console.log(res.data.user_chats);
        });
    }, [user]);
    return (
        <>
            <h1>Dashboard Goes here</h1>
            {chats.length > 0 ? (
                chats.map(chat => {
                    return (
                        <Link to={"/group/" + chat.chat_id}>
                            <Card style={{ width: "18rem" }}>
                                <Card.Img
                                    variant="top"
                                    src="holder.js/100px180"
                                />
                                <Card.Body>
                                    <Card.Title>
                                        Group Name: {chat.chat_name}
                                    </Card.Title>
                                    <Card.Text>
                                        Chat Size: {chat.chat_size}
                                    </Card.Text>
                                    <Button variant="primary">
                                        Go somewhere
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Link>
                    );
                })
            ) : (
                <HashLoader color={"#d4af37"} />
            )}
        </>
    );
};

export default Dashboard;
