import React from "react";
import { Row, Col, Modal } from "react-bootstrap";

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
                    <Modal.Dialog>
                        <Modal.Header>
                            <h1>
                                <strong>{group.chat_size}</strong>
                            </h1>
                        </Modal.Header>
                        <Modal.Footer>
                            <h4>
                                <strong>Chat Size</strong>
                            </h4>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Col>
                <Col sm>
                    <Modal.Dialog>
                        <Modal.Header>
                            <h1>
                                <strong>{totalMediaSize}</strong>
                            </h1>
                        </Modal.Header>
                        <Modal.Footer>
                            <h4>
                                <strong>Total Messages</strong>
                            </h4>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Col>
                <Col sm>
                    <Modal.Dialog>
                        <Modal.Header>
                            <h1>
                                <strong>{logs.length}</strong>
                            </h1>
                        </Modal.Header>
                        <Modal.Footer>
                            <h4>
                                <strong>Text Messages</strong>
                            </h4>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Col>
                <Col sm>
                    <Modal.Dialog>
                        <Modal.Header>
                            <h1>
                                <strong>{images.length}</strong>
                            </h1>
                        </Modal.Header>
                        <Modal.Footer>
                            <h4>
                                <strong>Images</strong>
                            </h4>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Col>
            </Row>
            <Row>
                <Col sm>
                    <Modal.Dialog>
                        <Modal.Header>
                            <h1>
                                <strong>{videos.length}</strong>
                            </h1>
                        </Modal.Header>
                        <Modal.Footer>
                            <h4>
                                <strong>Videos</strong>
                            </h4>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Col>
                <Col sm>
                    <Modal.Dialog>
                        <Modal.Header>
                            <h1>
                                <strong>{docs.length}</strong>
                            </h1>
                        </Modal.Header>
                        <Modal.Footer>
                            <h4>
                                <strong>Docs</strong>
                            </h4>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Col>
                <Col sm>
                    <Modal.Dialog>
                        <Modal.Header>
                            <h1>
                                <strong>{locations.length}</strong>
                            </h1>
                        </Modal.Header>
                        <Modal.Footer>
                            <h4>
                                <strong>Locations</strong>
                            </h4>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Col>
                <Col sm>
                    <Modal.Dialog>
                        <Modal.Header>
                            <h1>
                                <strong>{voices.length}</strong>
                            </h1>
                        </Modal.Header>
                        <Modal.Footer>
                            <h4>
                                <strong>Voice Messages</strong>
                            </h4>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Col>
            </Row>
        </div>
    );
};

export default GroupStats;
