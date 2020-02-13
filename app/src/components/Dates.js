import React from "react";
import { Button } from "react-bootstrap";
import moment from "moment";

const Dates = params => {
    return (
        <div>
            <Button
                onClick={() => {
                    params.setDateRange([
                        moment()
                            .subtract(1, "day")
                            .format("YYYY-MM-DD HH:mm:ss"),
                        moment().format("YYYY-MM-DD HH:mm:ss")
                    ]);
                }}
            >
                Last 24 Hours
            </Button>
            <Button
                onClick={() => {
                    params.setDateRange([
                        moment()
                            .subtract(7, "day")
                            .format("YYYY-MM-DD HH:mm:ss"),
                        moment().format("YYYY-MM-DD HH:mm:ss")
                    ]);
                }}
            >
                Last 7 Days
            </Button>
            <Button
                onClick={() => {
                    params.setDateRange([
                        moment()
                            .subtract(30, "day")
                            .format("YYYY-MM-DD HH:mm:ss"),
                        moment().format("YYYY-MM-DD HH:mm:ss")
                    ]);
                }}
            >
                Last 30 Days
            </Button>
            <Button
                onClick={() => {
                    params.setDateRange([
                        moment()
                            .subtract(2, "year")
                            .format("YYYY-MM-DD HH:mm:ss"),
                        moment().format("YYYY-MM-DD HH:mm:ss")
                    ]);
                }}
            >
                All Time
            </Button>
        </div>
    );
};

export default Dates;
