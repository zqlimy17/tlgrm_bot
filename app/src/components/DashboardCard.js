import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Button } from "react-bootstrap";
import GroupPhoto from "../components/GroupPhoto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import TotalMedia from "../components/TotalMedia";

const DashboardCard = ({ chat }) => {
    return (
        <div className="p-2">
            <Row className="group-card">
                <div className="col-sm-2 profile-photo-backround py-3">
                    <Link to={"/group/" + chat.chat_id}>
                        <GroupPhoto id={chat.chat_id} />
                    </Link>
                </div>
                <div className="col py-3">
                    <Link to={"/group/" + chat.chat_id}>
                        <h2>{chat.chat_name} </h2>
                    </Link>
                    <p>
                        <span className="badge badge-secondary text-uppercase">
                            {chat.chat_type}
                        </span>{" "}
                        ||<strong> ID: {chat.chat_id}</strong> || Size:{" "}
                        {chat.chat_size} || <TotalMedia id={chat.chat_id} />
                    </p>
                    <hr />
                    <Link to={"/group/" + chat.chat_id}>
                        <Button className="btn-warning">
                            View Analytics
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="ml-2"
                            />
                        </Button>
                    </Link>
                </div>
            </Row>
        </div>
    );
};

export default DashboardCard;
