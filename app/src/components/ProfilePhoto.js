import React, { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import axios from "axios";

const ProfilePhoto = ({ id }) => {
    let [url, setUrl] = useState();
    useEffect(() => {
        console.log(id);
        const fetchData = async () => {
            let res = await axios.get(
                `https://tlgrm-analytics-server.herokuapp.com/user/${id}/profile-photo`
            );
            setUrl(res.data.photo_url);
        };
        fetchData();
    }, [id]);
    return (
        <React.Fragment>
            {url ? (
                <img
                    src={url}
                    onError={event => {
                        event.target.src = `https://via.placeholder.com/150`;
                    }}
                    alt="Profile"
                    className="profile-photo img-fluid"
                />
            ) : (
                <ScaleLoader color={"#e37400"} />
            )}
        </React.Fragment>
    );
};

export default ProfilePhoto;
