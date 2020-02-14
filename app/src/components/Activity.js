import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

const Activity = ({ media, dateRange }) => {
    const { logs, images, videos, docs, locations, voices } = media;
    const [dates, setDates] = useState([]);
    useEffect(() => {
        console.log(
            moment(logs[0].created_at).diff(
                moment(logs[logs.length - 1].created_at),
                "days"
            )
        );
    }, [media, dateRange]);
    const data = {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July"
        ],
        datasets: [
            {
                label: "My First dataset",
                fill: false,
                lineTension: 0.05,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };
    return (
        <div>
            <h2>Line Example</h2>
            <Line data={data} />
        </div>
    );
};

export default Activity;
