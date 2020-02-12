import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";

const GroupStats = ({ group, messages }) => {
    useEffect(() => {
        console.log(group);
    }, []);
    return (
        <div>
            <Row>
                <Col sm>
                    <h2>Chat Size: {group.chat_size}</h2>
                </Col>
                <Col sm>
                    <h2>Total Messages: {messages.length}</h2>
                </Col>
            </Row>
        </div>
    );
};

export default GroupStats;
