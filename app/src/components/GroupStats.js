import React from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faComment,
    faUsers,
    faComments,
    faImages,
    faVideo,
    faFile,
    faMapMarkedAlt,
    faMicrophoneAlt
} from "@fortawesome/free-solid-svg-icons";

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
                            <h5>
                                <FontAwesomeIcon
                                    icon={faUsers}
                                    className="mx-2"
                                />{" "}
                                <strong>Chat Size</strong>
                            </h5>
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
                            <h5>
                                <FontAwesomeIcon
                                    icon={faComments}
                                    className="mx-2"
                                />{" "}
                                <strong>Total Messages</strong>
                            </h5>
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
                            <h5>
                                <FontAwesomeIcon
                                    icon={faComment}
                                    className="mx-2"
                                />{" "}
                                <strong>Text Messages</strong>
                            </h5>
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
                            <h5>
                                <FontAwesomeIcon
                                    icon={faImages}
                                    className="mx-2"
                                />{" "}
                                <strong>Images</strong>
                            </h5>
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
                            <h5>
                                <FontAwesomeIcon
                                    icon={faVideo}
                                    className="mx-2"
                                />{" "}
                                <strong>Videos</strong>
                            </h5>
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
                            <h5>
                                <FontAwesomeIcon
                                    icon={faFile}
                                    className="mx-2"
                                />{" "}
                                <strong>Docs</strong>
                            </h5>
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
                            <h5>
                                <FontAwesomeIcon
                                    icon={faMapMarkedAlt}
                                    className="mx-2"
                                />{" "}
                                <strong>Locations</strong>
                            </h5>
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
                            <h5>
                                <FontAwesomeIcon
                                    icon={faMicrophoneAlt}
                                    className="mx-2"
                                />{" "}
                                <strong>Voice Messages</strong>
                            </h5>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Col>
            </Row>
        </div>
    );
};

export default GroupStats;
