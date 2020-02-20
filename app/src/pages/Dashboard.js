import React, { useState, useEffect } from "react";
import { Row, Button } from "react-bootstrap";
import axios from "axios";
import { ScaleLoader } from "react-spinners";

import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {
    const user = useState("738282366");
    const [chats, setChats] = useState([]);
    useEffect(() => {
        const fecthData = async () => {
            await axios
                .get(
                    `https://tlgrm-analytics-server.herokuapp.com/users/${user[0]}`
                )
                .then(res => {
                    setChats(res.data.chats);
                    console.log(res.data.chats);
                });
        };
        fecthData();
    }, []);
    return (
        <>
            <div className="container-fluid">
                <Row>
                    <div className="col-3 profile-column">
                        <p>DP goes here</p>
                        <p>Name Goes here</p>
                        <p>Username Goes here</p>
                        <p>Logout Goes here</p>
                    </div>
                    <div className="col offset-3">
                        <div className="pr-5">
                            {chats.length > 0 ? (
                                chats.map((chat, index) => {
                                    return (
                                        <DashboardCard
                                            chat={chat}
                                            key={index}
                                        />
                                    );
                                })
                            ) : (
                                <ScaleLoader color={"#e37400"} />
                            )}
                        </div>
                    </div>
                </Row>
            </div>
        </>
    );
};

export default Dashboard;
