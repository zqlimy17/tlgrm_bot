import React from "react";
import { Modal } from "react-bootstrap";
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
        for (let i = 0; i < 6; i++) {
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
                label: "Activity [Days]",
                backgroundColor: "rgba(249,171,0,0.2)",
                borderColor: "rgba(249,171,0,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(227,116,0,1)",
                hoverBorderColor: "rgba(220,220,220,1)",
                data: yAxis
            }
        ]
    };
    const options = {
        legend: {
            display: false
        }
    };

    const download = () => {
        var link = document.createElement("a");
        link.download = "ActivityDays.png";
        link.href = document.getElementById("active-days").toDataURL();
        link.click();
    };

    return (
        <div>
            <Modal.Dialog size="xl">
                <Modal.Header>
                    <h3>
                        <strong>Activity [Days]</strong>
                    </h3>
                    <button
                        className="btn btn-outline-dark pull-right"
                        onClick={() => {
                            download();
                        }}
                    >
                        Export as PNG
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <Bar data={data} options={options} id="active-days" />
                </Modal.Body>
            </Modal.Dialog>
        </div>
    );
};

export default ActiveDays;
