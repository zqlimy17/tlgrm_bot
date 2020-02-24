import React from "react";
import { Pie } from "react-chartjs-2";
import { Modal } from "react-bootstrap";

const MediaTypes = ({ media }) => {
    const { logs, images, videos, docs, locations, voices } = media;
    const data = {
        labels: [
            "Texts",
            "Images",
            "Videos",
            "Documents",
            "Locations",
            "Voices"
        ],
        datasets: [
            {
                data: [
                    logs.length,
                    images.length,
                    videos.length,
                    docs.length,
                    locations.length,
                    voices.length
                ],
                backgroundColor: [
                    "#ff1744",
                    "#ff9100",
                    "#ffea00",
                    "#00e676",
                    "#2979ff",
                    "#d500f9"
                ],
                hoverBackgroundColor: [
                    "#AA2E25",
                    "#b26a00",
                    "#b2a429",
                    "#618833",
                    "#2c387e",
                    "#6d1b7b"
                ]
            }
        ]
    };

    const options = {
        legend: { position: "left" }
    };

    const download = () => {
        var link = document.createElement("a");
        link.download = "MediaTypes.png";
        link.href = document.getElementById("media-types").toDataURL();
        link.click();
    };

    return (
        <div>
            <Modal.Dialog size="xl">
                <Modal.Header>
                    <h3>
                        <strong>Media Types</strong>
                    </h3>
                    <button
                        className="btn btn-outline-dark pull-right"
                        onClick={() => {
                            download();
                        }}
                    >
                        Export as PNG
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <Pie data={data} id="media-types" options={options} />
                </Modal.Body>
            </Modal.Dialog>
        </div>
    );
};

export default MediaTypes;
