import React from "react";
import { Pie } from "react-chartjs-2";

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
    return (
        <div>
            <Pie data={data} id="MediaTypes" />
        </div>
    );
};

export default MediaTypes;
