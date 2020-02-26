import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const TotalMedia = ({ id }) => {
    const [TotalMedia, setTotalMedia] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(
                `https://tlgrm-analytics-server.herokuapp.com/group/${id}`
            );
            await setTotalMedia(res.data.count);
        };
        fetchData();
    }, [id]);
    return (
        <Fragment>
            <span>
                Messages:{" "}
                {TotalMedia ? (
                    TotalMedia
                ) : (
                    <span className="d-inline-block">
                        <BeatLoader color={"#e37400"} size={5} />
                    </span>
                )}
            </span>
        </Fragment>
    );
};

export default TotalMedia;
