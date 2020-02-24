import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { ScaleLoader } from "react-spinners";
import moment from "moment";

const MediaPicture = ({ image, users }) => {
    const [modalShow, setModalShow] = React.useState(false);

    const ImageLightbox = props => {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body className="container-fluid">
                    <img
                        src={url}
                        className="img img-fluid mx-auto"
                        style={{ maxHeight: "600px", display: "block" }}
                    />
                </Modal.Body>
            </Modal>
        );
    };

    let [url, setUrl] = useState();
    useEffect(() => {
        const fetchData = async () => {
            let res = await axios.get(
                `http://localhost:8080/media/${image.file_id}`
            );
            setUrl(res.data.photo_url);
        };
        fetchData();
    }, [image]);
    return (
        <>
            {url ? (
                <div>
                    <div
                        className="square"
                        style={{
                            backgroundImage: `url('${url}')`
                        }}
                        onClick={() => setModalShow(true)}
                    >
                        <small className="image-text-overlay pb-2 pl-1">
                            {users
                                ? users.find(
                                      ({ telegram_id }) =>
                                          telegram_id === image.telegram_id
                                  ).username
                                : ""}
                            <br />
                            {moment(image.created_at).format(
                                "DD MMM YY HH:mm:ss"
                            )}
                        </small>
                    </div>
                    <ImageLightbox
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>
            ) : (
                // <ModalImage small={url} large={url} />
                <div className="d-flex align-items-center justify-content-center h-100">
                    <ScaleLoader color={"#e37400"} />
                </div>
            )}
        </>
    );
};

export default MediaPicture;
