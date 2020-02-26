import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import UserProfile from "../components/UserProfile";
import DashboardCard from "../components/DashboardCard";
import UserContext from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";

const Dashboard = setUser => {
    const { user, setCurrentUserId } = useContext(UserContext);
    const [chats, setChats] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get(
                    `https://tlgrm-analytics-server.herokuapp.com/users/${user.telegram_id}`
                )
                .then(res => {
                    setChats(res.data.chats);
                });
        };
        if (user) {
            fetchData();
        }
    }, [user]);
    return (
        <>
            {user ? "" : <Redirect to="/" />}
            <div className="container-fluid">
                <Row>
                    <div className="col-sm-3 profile-column">
                        {user ? (
                            <div className="text-center">
                                <div className="p-3">
                                    <UserProfile />
                                </div>
                                <p className="lead">
                                    <strong>ID: {user.telegram_id}</strong>
                                </p>
                                <p className="lead">@{user.username}</p>
                                <p className="lead">{user.first_name}</p>
                                <a href="/">
                                    <Button
                                        onClick={() => {
                                            setCurrentUserId(null);
                                        }}
                                        className="btn btn-danger"
                                    >
                                        LOGOUT{" "}
                                        <FontAwesomeIcon
                                            icon={faSignOutAlt}
                                            className="ml-1"
                                        />
                                    </Button>
                                </a>
                            </div>
                        ) : (
                            <div className="grid">
                                <ScaleLoader color={"#e37400"} />
                            </div>
                        )}
                        <img
                            src="/img/tlgrm-plane.png"
                            className="planey"
                            alt="tlgrm logo plane"
                        />
                    </div>
                    <Col sm={{ offset: 3 }}>
                        <div className="p-2">
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
                                <div className="grid">
                                    <ScaleLoader color={"#e37400"} />
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Dashboard;
