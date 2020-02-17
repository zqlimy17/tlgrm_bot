import React from "react";
import { Bar } from "react-chartjs-2";
import moment from "moment";

const ActiveTime = ({ media }) => {
    const { logs } = media;

    let xAxis = [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23"
    ];
    let yAxis = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ];
    const constructGraph = async () => {
        for (let i = 0; i < logs.length; i++) {
            logs.forEach(log => {
                if (moment(log.created_at).format("HH") === xAxis[i]) {
                    yAxis[i]++;
                }
            });
        }
        return;
    };
    constructGraph();

    const data = {
        labels: xAxis,
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
    return (
        <div>
            <Bar data={data} id="ActiveTime" />
        </div>
    );
};

export default ActiveTime;
