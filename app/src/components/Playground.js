import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const Chart = () => {
    const data = [
        { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
        { name: "Page C", uv: 200, pv: 1400, amt: 300 },
        { name: "Page D", uv: 100, pv: 500, amt: 1000 }
    ];
    return (
        <React.Fragment>
            <h5>Yeet</h5>
            <LineChart width={600} height={300} data={data}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
            </LineChart>
        </React.Fragment>
    );
};

export default Chart;
