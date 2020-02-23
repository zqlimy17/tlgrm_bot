import React, { useState, useEffect } from "react";
import axios from "axios";

const MediaPicture = ({ id }) => {
    let [url, setUrl] = useState();
    useEffect(() => {
        console.log(
            "<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ID >>>>>>>>>>>>>>>>>>>>>>>>>>>"
        );
        console.log(id);
        const fetchData = async () => {
            let res = await axios.get(`http://localhost:8080/media/${id}`);
            setUrl(res.data.photo_url);
            console.log(
                "<<<<<<<<<<<<<<<<<< RES DATA PHOTO URL >>>>>>>>>>>>>>>>>>>>"
            );
            console.log(res.data.photo_url);
        };
        fetchData();
    }, [id]);
    return (
        <div>
            <img src={url} />
        </div>
    );
};

export default MediaPicture;
