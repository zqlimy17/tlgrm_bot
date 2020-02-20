import React, { useState, useEffect, useContext } from "react";
import { Row, Button } from "react-bootstrap";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import GroupPhoto from "../components/GroupPhoto";
import DashboardCard from "../components/DashboardCard";
import UserContext from "../context/UserContext";

const Dashboard = () => {
    const user = useContext(UserContext);
    const [chats, setChats] = useState([]);
    useEffect(() => {
        console.log(user);
        const fecthData = async () => {
            await axios
                .get(
                    `https://tlgrm-analytics-server.herokuapp.com/users/${user}`
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
                        <GroupPhoto id={"738282366"} />
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
