import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Redirect, Route, Link } from "react-router-dom";

import { useParams } from "react-router";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import moment from "moment";
import Messages from "../components/Messages";
import Pagination from "../components/Pagination";
import Dates from "../components/Dates";
import GroupStats from "../components/GroupStats";
import MediaTypes from "../components/MediaTypes";
import Activity from "../components/Activity";
import UsersTable from "../components/UsersTable";
import ActiveTime from "../components/ActiveTime";
import UsersMessagePie from "../components/UsersMessagePie";
import ActiveDays from "../components/ActiveDays";
import GroupPhoto from "../components/GroupPhoto";
import MediaPicture from "../components/MediaPicture";
import UserContext from "../context/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faTable,
    faUsers,
    faComments,
    faImages
} from "@fortawesome/free-solid-svg-icons";

import { Row, Col } from "react-bootstrap";

const Group = () => {
    const { user } = useContext(UserContext);

    let { id } = useParams();
    const [group, setGroup] = useState();
    const [users, setUsers] = useState(null);
    const [showDate, setShowDate] = useState(30);

    // Media
    const [media, setMedia] = useState();
    const [messages, setMessages] = useState([]);

    // Pagination
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [messagesPerPage] = useState(10);
    const [dateRange, setDateRange] = useState([
        moment()
            .subtract(30, "day")
            .format("YYYY-MM-DD HH:mm:ss"),
        moment().format("YYYY-MM-DD HH:mm:ss")
    ]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await axios({
                method: "post",
                url: "https://tlgrm-analytics-server.herokuapp.com/group",
                data: {
                    id: id,
                    then: dateRange[0],
                    now: dateRange[1]
                }
            });
            await setMedia(res.data.media);
            const { logs } = res.data.media;
            logs.reverse();
            await setGroup(res.data.chat[0]);
            await setUsers(res.data.users);
            await setMessages(logs);
            setLoading(false);
        };
        fetchData();
    }, [dateRange, id]);

    // Get Current Messages
    const indexOfLastMessage = currentPage * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentMessage = messages.slice(
        indexOfFirstMessage,
        indexOfLastMessage
    );

    // Change Page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            {user ? "" : <Redirect to="/" />}
            <div className="container-fluid">
                <Row>
                    <Col lg={2} className="profile-column">
                        {group ? (
                            <div>
                                <div className="text-center">
                                    <div className="px-3 py-2 group-page-photo">
                                        <GroupPhoto id={id} />
                                    </div>
                                    <p className="lead">
                                        <strong>
                                            {group ? group.chat_name : ""}
                                        </strong>
                                    </p>
                                </div>
                                <hr />
                                <Link to={`/group/${id}/overview`}>
                                    <p>
                                        <FontAwesomeIcon
                                            icon={faTable}
                                            className="mx-2"
                                        />
                                        Overview
                                    </p>
                                </Link>
                                <Link to={`/group/${id}/members`}>
                                    <p>
                                        <FontAwesomeIcon
                                            icon={faUsers}
                                            className="mx-2"
                                        />
                                        Members
                                    </p>
                                </Link>
                                <Link to={`/group/${id}/messages`}>
                                    <p>
                                        <FontAwesomeIcon
                                            icon={faComments}
                                            className="mx-2"
                                        />
                                        Messages
                                    </p>
                                </Link>
                                <Link to={`/group/${id}/pictures`}>
                                    <p>
                                        {" "}
                                        <FontAwesomeIcon
                                            icon={faImages}
                                            className="mx-2"
                                        />
                                        Pictures
                                    </p>
                                </Link>
                            </div>
                        ) : (
                            ""
                        )}
                    </Col>
                    <Col lg={{ offset: 2 }} className="main-display">
                        <Row className="pt-2 fix-date">
                            <div className="col">
                                {messages ? (
                                    <Dates
                                        setDateRange={setDateRange}
                                        setShowDate={setShowDate}
                                        messages={messages}
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        </Row>
                        <Route path="/group/:id/overview">
                            {media ? (
                                <div className="py-3 mb-4">
                                    <h1>Overview</h1>
                                    <div className="px-3">
                                        {media ? (
                                            <Activity
                                                media={media}
                                                showDate={showDate}
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <hr />
                                    <div className="px-3">
                                        {group ? (
                                            <GroupStats
                                                group={group}
                                                media={media}
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <hr />
                                    <div className="px-3">
                                        <Row>
                                            <Col md={6}>
                                                {media ? (
                                                    <ActiveDays media={media} />
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                            <Col md={6}>
                                                {media ? (
                                                    <ActiveTime media={media} />
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr />
                                    <div className="px-3">
                                        <Row>
                                            <Col md={6}>
                                                {users ? (
                                                    <UsersMessagePie
                                                        users={users}
                                                    />
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                            <Col md={6}>
                                                {group ? (
                                                    <MediaTypes
                                                        media={media}
                                                        dateRange={dateRange}
                                                    />
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            ) : (
                                <div className="d-flex align-items-center justify-content-center h-100">
                                    <ScaleLoader color={"#e37400"} />
                                </div>
                            )}
                        </Route>
                        <Route path="/group/:id/members">
                            {users ? (
                                <UsersTable users={users} />
                            ) : (
                                <div className="d-flex align-items-center justify-content-center h-100">
                                    <ScaleLoader color={"#e37400"} />
                                </div>
                            )}
                        </Route>
                        <Route path="/group/:id/messages">
                            <Messages
                                messages={currentMessage}
                                loading={loading}
                                users={users}
                            />
                            <Pagination
                                messagesPerPage={messagesPerPage}
                                totalMessages={messages.length}
                                paginate={paginate}
                                className="pagination"
                            />
                        </Route>
                        <Route path="/group/:id/pictures">
                            <div className="py-3 mb-4">
                                <h1>Pictures</h1>
                                <Row className="px-2">
                                    {media
                                        ? media.images.map((image, index) => {
                                              return (
                                                  <Col
                                                      sm={2}
                                                      className="p-2"
                                                      key={index}
                                                  >
                                                      <MediaPicture
                                                          users={users}
                                                          image={image}
                                                      />
                                                  </Col>
                                              );
                                          })
                                        : ""}
                                </Row>
                            </div>
                        </Route>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Group;
