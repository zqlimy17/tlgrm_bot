import React from "react";
import { Button } from "react-bootstrap";
import moment from "moment";

const Dates = (params, setShowDate) => {
    return (
        <div>
            <div
                // class="btn-group d-flex flex-row-reverse"
                // role="group"
                // aria-label="Basic example"
                className="d-flex"
            >
                <p
                    className="px-3 pt-1 date-buttons m-0"
                    // className="btn-warning"
                    onClick={() => {
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
                    className="px-3 pt-1 date-buttons m-0"
                    // className="btn-warning"
                    onClick={() => {
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
                    className="px-3 pt-1 date-buttons m-0"
                    // className="btn-warning"
                    onClick={() => {
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
                    className="px-3 pt-1 date-buttons m-0"
                    // className="btn-warning"
                    onClick={() => {
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
