import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import moment from "moment";

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
                label: "Activity",
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
            <Bar
                data={data}
                height={500}
                options={{
                    maintainAspectRatio: false
                }}
            />{" "}
        </div>
    );
};

export default Activity;
