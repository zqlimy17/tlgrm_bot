import React from "react";
import { Row, Col } from "react-bootstrap";

const GroupStats = ({
    group,
    messages,
    voices,
    docs,
    videos,
    images,
    locations
}) => {
    let totalMedia =
        messages.length +
        voices.length +
        docs.length +
        videos.length +
        images.length +
        locations.length;

    return (
        <div>
            <Row>
                <Col sm>
                    <h2>Chat Size: {group.chat_size}</h2>
                </Col>
                <Col sm>
                    <h2>Total Messages: {totalMedia}</h2>
                </Col>
            </Row>
        </div>
    );
};

export default GroupStats;
