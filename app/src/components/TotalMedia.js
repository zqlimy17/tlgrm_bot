import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const TotalMedia = ({ id }) => {
    const [TotalMedia, setTotalMedia] = useState();
    // const { logs, voices, docs, videos, images, locations } = TotalMedia;
    // let totalMediaSize =
    //     logs.length +
    //     voices.length +
    //     docs.length +
    //     videos.length +
    //     images.length +
    //     locations.length;
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:8080/group/${id}`);
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
                    <div className="d-inline-block">
                        <BeatLoader color={"#e37400"} size={5} />
                    </div>
                )}
            </span>
        </Fragment>
    );
};

export default TotalMedia;
