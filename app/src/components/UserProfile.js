import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

const UserProfile = () => {
    const user = useContext(UserContext);
    const fallback = () => {
        if (user.first_name) {
            return user.first_name.charAt(0).toUpperCase();
        } else if (user.username) {
            return user.username.charAt(0).toUpperCase();
        } else {
            return user.last_name.charAt(0).toUpperCase();
        }
    };

    let [url, setUrl] = useState();
    useEffect(() => {
        const fetchData = async () => {
            let res = await axios.get(
                `https://tlgrm-analytics-server.herokuapp.com/user/${user.telegram_id}/profile-photo`,
                { timeout: 8000 }
            );
            setUrl(res.data.photo_url);
        };
        fetchData();
    }, [user]);
    return (
        <>
            {url ? (
                <img
                    src={url}
                    onError={event => {
                        event.target.src = `https://dummyimage.com/250.png/fab41d&text=${fallback()}`;
                    }}
                    alt="Profile"
                    className="profile-photo img-fluid"
                />
            ) : (
                <img
                    className="profile-photo img-fluid"
                    src={`https://dummyimage.com/500.png/fab41d&text=${fallback()}`}
                />
            )}
        </>
    );
};

export default UserProfile;
