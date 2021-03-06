import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { Modal } from "react-bootstrap";

const Activity = ({ media, showDate }) => {
    const { logs } = media;
    const [dates, setDates] = useState([]);
    useEffect(() => {
        const setData = async () => {
            if (!showDate) {
                setDates(
                    moment(logs[0].created_at).diff(
                        moment(logs[logs.length - 1].created_at),
                        "days"
                    )
                );
            }
        };
        setData();
    }, [showDate, logs]);

    let xAxis = [];
    let yAxis = [];
    const constructGraph = async () => {
        if (showDate === null) {
            let x = Math.ceil(dates / 30.25);
            for (let i = x; i >= 0; i--) {
                yAxis.push(0);
                xAxis.push(
                    moment()
                        .subtract(i, "months")
                        .format("MMMM YYYY")
                );
                logs.forEach(log => {
                    if (
                        moment(log.created_at).format("MMMM YYYY") ===
                        moment()
                            .subtract(i, "months")
                            .format("MMMM YYYY")
                    ) {
                        yAxis[x - i]++;
                    }
                });
            }
        } else {
            for (let i = showDate - 1; i >= 0; i--) {
                yAxis.push(0);
                xAxis.push(
                    moment()
                        .subtract(i, "days")
                        .format("DD MMMM")
                );
                logs.forEach(log => {
                    if (
                        moment(log.created_at).format("DD MMMM") ===
                        moment()
                            .subtract(i, "days")
                            .format("DD MMMM")
                    ) {
                        yAxis[showDate - i - 1]++;
                    }
                });
            }
        }
        return;
    };
    constructGraph();

    const data = {
        labels: xAxis,
        datasets: [
            {
                label: "Messages Sent",
                fill: true,
                lineTension: 0.3,
                backgroundColor: "rgba(249,171,0,0.4)",
                borderColor: "rgba(249,171,0,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(151,77,0,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(227,116,0,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
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
        link.download = "MessagesSent.png";
        link.href = document.getElementById("messages-sent").toDataURL();
        link.click();
    };

    return (
        <Modal.Dialog size="xl">
            <Modal.Header>
                <p className="h3">
                    <strong>Messages Sent</strong>
                </p>
                <button
                    className="btn btn-outline-dark pull-right"
                    onClick={() => {
                        download();
                    }}
                >
                    Export as PNG
                </button>
            </Modal.Header>
            <Modal.Body className="container-fluid">
                <Line data={data} id="messages-sent" options={options} />
            </Modal.Body>
        </Modal.Dialog>
    );
};

export default Activity;
