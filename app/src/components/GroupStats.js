import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";

const GroupStats = ({ group, media }) => {
    const { logs, voices, docs, videos, images, locations } = media;
    let totalMediaSize =
        logs.length +
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
                    <h2>Total Messages: {totalMediaSize}</h2>
                </Col>
                <Col sm>
                    <h2>Texts: {logs.length}</h2>
                </Col>
                <Col sm>
                    <h2>Images: {images.length}</h2>
                </Col>
            </Row>
            <Row>
                <Col sm>
                    <h2>Videos: {videos.length}</h2>
                </Col>
                <Col sm>
                    <h2>Documents: {docs.length}</h2>
                </Col>
                <Col sm>
                    <h2>Location: {locations.length}</h2>
                </Col>
                <Col sm>
                    <h2>Voices: {voices.length}</h2>
                </Col>
            </Row>
        </div>
    );
};

export default GroupStats;
