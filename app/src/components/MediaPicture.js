import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { ScaleLoader } from "react-spinners";

const MediaPicture = ({ id, index }) => {
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
            let res = await axios.get(`http://localhost:8080/media/${id}`);
            setUrl(res.data.photo_url);
        };
        fetchData();
    }, [id]);
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
                    />
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
