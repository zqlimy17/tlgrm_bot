import React from "react";
import { Doughnut } from "react-chartjs-2";

const Users = ({ users }) => {
    const donutLabels = [];
    const donutValues = [];
    const color = [];
    users.forEach(user => {
        donutLabels.push(user.username);
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
    return (
        <div>
            <h1>YEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEET</h1>
            <Doughnut data={data} />
        </div>
    );
};

export default Users;
