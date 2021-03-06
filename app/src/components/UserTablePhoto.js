import React, { useState, useEffect } from "react";
import axios from "axios";

const UserTablePhoto = ({ user }) => {
    const fallback = () => {
        if (user) {
            if (user.first_name) {
                return user.first_name.charAt(0).toUpperCase();
            } else if (user.username) {
                return user.username.charAt(0).toUpperCase();
            } else {
                return user.last_name.charAt(0).toUpperCase();
            }
        }
    };

    let [url, setUrl] = useState();
    useEffect(() => {
        console.table(user);
        const fetchData = async () => {
            if (user) {
                let res = await axios.get(
                    `https://tlgrm-analytics-server.herokuapp.com/user/${user.telegram_id}/profile-photo`,
                    { timeout: 8000 }
                );
                setUrl(res.data.photo_url);
            }
        };
        fetchData();
    }, [user]);
    return (
        <>
            {url ? (
                <img
                    src={url}
                    alt="Profile"
                    className="user-table-photo img-fluid"
                />
            ) : (
                <img
                    alt="fallback"
                    className="user-table-photo img-fluid"
                    src={`https://dummyimage.com/500.png/fab41d&text=${fallback()}`}
                />
            )}
        </>
    );
};

export default UserTablePhoto;
