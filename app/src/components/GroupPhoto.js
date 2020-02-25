import React, { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import axios from "axios";

const GroupPhoto = ({ id }) => {
    let [url, setUrl] = useState();
    useEffect(() => {
        const fetchData = async () => {
            let res = await axios.get(
                `https://tlgrm-analytics-server.herokuapp.com/group/${id}/profile-photo`
            );
            setUrl(res.data.photo_url);
        };
        fetchData();
    }, [id]);
    return (
        <>
            {url ? (
                <div>
                    <img
                        src={url}
                        onError={event => {
                            event.target.src = `https://dummyimage.com/300.png/fab41d&text=TA`;
                        }}
                        alt="Profile"
                        className="profile-photo img-fluid"
                    />
                </div>
            ) : (
                <div className="d-flex align-items-center justify-content-center h-100">
                    <ScaleLoader color={"#e37400"} />
                </div>
            )}
        </>
    );
};

export default GroupPhoto;
