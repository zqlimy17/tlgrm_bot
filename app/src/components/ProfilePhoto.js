import React, { useState, useEffect } from "react";
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
        <div>
            {url ? (
                <img
                    src={url}
                    onError={event => {
                        event.target.src = `https://via.placeholder.com/150`;
                    }}
                />
            ) : (
                ""
            )}
        </div>
    );
};

export default ProfilePhoto;
