import React, { useState, useEffect, useContext } from "react";
import { Row, Button } from "react-bootstrap";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import UserProfile from "../components/UserProfile";
import DashboardCard from "../components/DashboardCard";
import UserContext from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Dashboard = setUser => {
    const { user, setCurrentUserId } = useContext(UserContext);
    const [chats, setChats] = useState([]);
    useEffect(() => {
        console.log(user);
        console.log(chats);
        const fetchData = async () => {
            await axios
                .get(`http://localhost:8080/users/${user.telegram_id}`)
                .then(res => {
                    setChats(res.data.chats);
                    console.log(res.data.chats);
                });
        };
        if (user) {
            fetchData();
        }
    }, [user]);
    return (
        <>
            <div className="container-fluid">
                <Row>
                    <div className="col-3 profile-column">
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
                        <img src="/img/tlgrm-plane.png" className="planey" />
                    </div>
                    <div className="col offset-3">
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
                    </div>
                </Row>
            </div>
        </>
    );
};

export default Dashboard;
