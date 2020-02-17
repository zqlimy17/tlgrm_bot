import React from "react";
import { Bar } from "react-chartjs-2";
import moment from "moment";

const ActiveDays = ({ media }) => {
    const { logs } = media;

    let xAxis = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    let yAxis = [0, 0, 0, 0, 0, 0, 0];
    const constructGraph = async () => {
        for (let i = 0; i < logs.length; i++) {
            logs.forEach(log => {
                if (moment(log.created_at).format("dddd") === xAxis[i]) {
                    yAxis[i]++;
                }
            });
        }
        return;
    };
    constructGraph();

    const data = {
        labels: [
            "Mondays",
            "Tuesdays",
            "Wednesdays",
            "Thursdays",
            "Fridays",
            "Saturdays",
            "Sundays"
        ],
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: yAxis
            }
        ]
    };

    const download = () => {
        var link = document.createElement("a");
        link.download = "ActiveDays.png";
        link.href = document.getElementById("active-days").toDataURL();
        link.click();
    };

    return (
        <div>
            <Bar data={data} id="active-days" />
            <button
                onClick={() => {
                    download();
                }}
            >
                Download
            </button>
        </div>
    );
};

export default ActiveDays;
