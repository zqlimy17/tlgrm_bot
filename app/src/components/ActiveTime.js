import React from "react";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import { Modal } from "react-bootstrap";

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
        logs.forEach(log => {
            yAxis[moment(log.created_at).format("HH")]++;
        });
        return;
    };
    constructGraph();

    const data = {
        labels: xAxis,
        datasets: [
            {
                label: "Activity [Hours]",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
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
        link.download = "ActivityHours.png";
        link.href = document.getElementById("activity-hours").toDataURL();
        link.click();
    };

    return (
        <div>
            <Modal.Dialog size="xl">
                <Modal.Header>
                    <h3>
                        <strong>Activity [Hours]</strong>
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
                    <Bar data={data} id="activity-hours" options={options} />
                </Modal.Body>
            </Modal.Dialog>
        </div>
    );
};

export default ActiveTime;
