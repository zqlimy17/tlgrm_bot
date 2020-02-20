import React, { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import axios from "axios";

const GroupPhoto = ({ id }) => {
    let [url, setUrl] = useState();
    useEffect(() => {
        console.log(id);
        const fetchData = async () => {
            let res = await axios.get(
                `https://tlgrm-analytics-server.herokuapp.com/group/${id}/profile-photo`
            );
            console.log("RES IS", res.data);
            setUrl(res.data.photo_url);
        };
        fetchData();
    }, [id]);
    return (
        <>
            {url ? (
                <img
                    src={url}
                    onError={event => {
                        event.target.src = `https://dummyimage.com/300.png/fab41d&text=TA`;
                    }}
                    alt="Profile"
                    className="profile-photo img-fluid"
                />
            ) : (
                <div className="d-flex align-items-center justify-content-center h-100">
                    <ScaleLoader color={"#e37400"} />
                </div>
            )}
        </>
    );
};

export default GroupPhoto;
