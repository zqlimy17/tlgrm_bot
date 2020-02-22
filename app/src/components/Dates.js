import React, { useState } from "react";
import moment from "moment";

const Dates = (params, setShowDate) => {
    const [selectedDate, setSelectedDate] = useState(3);
    return (
        <div>
            <div className="d-flex float-right">
                <p
                    className={
                        (selectedDate === 1 ? "active " : "") +
                        "mx-1 btn-outline-warning btn"
                    }
                    onClick={() => {
                        setSelectedDate(1);
                        params.setShowDate(1);
                        params.setDateRange([
                            moment()
                                .subtract(1, "day")
                                .format("YYYY-MM-DD HH:mm:ss"),
                            moment().format("YYYY-MM-DD HH:mm:ss")
                        ]);
                    }}
                >
                    Last 24 Hours
                </p>
                <p
                    className={
                        (selectedDate === 2 ? "active " : "") +
                        "mx-1 btn-outline-warning btn"
                    }
                    onClick={() => {
                        setSelectedDate(2);
                        params.setShowDate(7);
                        params.setDateRange([
                            moment()
                                .subtract(7, "day")
                                .format("YYYY-MM-DD HH:mm:ss"),
                            moment().format("YYYY-MM-DD HH:mm:ss")
                        ]);
                    }}
                >
                    Last 7 Days
                </p>
                <p
                    className={
                        (selectedDate === 3 ? "active " : "") +
                        "mx-1 btn-outline-warning btn"
                    }
                    onClick={() => {
                        setSelectedDate(3);
                        params.setShowDate(30);
                        params.setDateRange([
                            moment()
                                .subtract(30, "day")
                                .format("YYYY-MM-DD HH:mm:ss"),
                            moment().format("YYYY-MM-DD HH:mm:ss")
                        ]);
                    }}
                >
                    Last 30 Days
                </p>
                <p
                    className={
                        (selectedDate === 4 ? "active " : "") +
                        "mx-1 btn-outline-warning btn"
                    }
                    onClick={() => {
                        setSelectedDate(4);
                        params.setShowDate(null);
                        params.setDateRange([null, null]);
                    }}
                >
                    All Time
                </p>
            </div>
        </div>
    );
};

export default Dates;
