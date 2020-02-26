import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Modal } from "react-bootstrap";

const UsersMessagePie = ({ users }) => {
    const donutLabels = [];
    const donutValues = [];
    const color = [];
    users.forEach(user => {
        if (user.username) {
            donutLabels.push(user.username);
        } else if (user.first_name) {
            donutLabels.push(user.first_name);
        } else if (user.last_name) {
            donutLabels.push(user.last_name);
        } else {
            donutLabels.push("Anonymous");
        }
        donutValues.push(
            user.log_count +
                user.video_count +
                user.voice_count +
                user.location_count +
                user.doc_count +
                user.image_count
        );
        color.push(getRandomColor());
    });

    function getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const data = {
        labels: donutLabels,
        datasets: [
            {
                data: donutValues,
                backgroundColor: color,
                hoverBackgroundColor: color
            }
        ]
    };

    const options = {
        legend: { position: "left" }
    };

    const download = () => {
        var link = document.createElement("a");
        link.download = "MessagersPerUser.png";
        link.href = document.getElementById("messages-per-user").toDataURL();
        link.click();
    };
    return (
        <div>
            <Modal.Dialog size="xl">
                <Modal.Header>
                    <h3>
                        <strong>Messages per User</strong>
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
                    <Doughnut
                        data={data}
                        options={options}
                        id="messages-per-user"
                    />
                </Modal.Body>
            </Modal.Dialog>
        </div>
    );
};

export default UsersMessagePie;
