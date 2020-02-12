import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { HashLoader } from "react-spinners";
import moment from "moment";
import { Button } from "react-bootstrap";

const Group = () => {
    let { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [group, setGroup] = useState();
    const [users, setUsers] = useState(null);
    const [dateRange, setDateRange] = useState([
        moment()
            .subtract(30, "day")
            .format("YYYY-MM-DD HH:MM:SS"),
        moment().format("YYYY-MM-DD HH:MM:SS")
    ]);

    useEffect(() => {
        async function fetchData() {
            let res = await axios({
                method: "post",
                url: "http://localhost:4040/group",
                data: {
                    id: id,
                    then: dateRange[0],
                    now: dateRange[1]
                }
            });
            console.log(res);
            let reverse = res.data.logs;
            reverse.reverse();
            await setMessages(reverse);
            await setGroup(res.data.chat);
            await setUsers(res.data.users);
        }
        fetchData();
    }, [dateRange, id]);

    return (
        <>
            <h1>
                {group ? group.chat_name : <HashLoader color={"#d4af37"} />}
            </h1>
            <div>
                <Button
                    onClick={() => {
                        setDateRange([
                            moment()
                                .subtract(1, "day")
                                .format("YYYY-MM-DD HH:MM:SS"),
                            moment().format("YYYY-MM-DD HH:MM:SS")
                        ]);
                    }}
                >
                    Last 24 Hours
                </Button>
                <Button
                    onClick={() => {
                        setDateRange([
                            moment()
                                .subtract(7, "day")
                                .format("YYYY-MM-DD HH:MM:SS"),
                            moment().format("YYYY-MM-DD HH:MM:SS")
                        ]);
                    }}
                >
                    Last 7 Days
                </Button>
                <Button
                    onClick={() => {
                        setDateRange([
                            moment()
                                .subtract(30, "day")
                                .format("YYYY-MM-DD HH:MM:SS"),
                            moment().format("YYYY-MM-DD HH:MM:SS")
                        ]);
                    }}
                >
                    Last 30 Days
                </Button>
                <Button
                    onClick={() => {
                        setDateRange([
                            moment()
                                .subtract(2, "year")
                                .format("YYYY-MM-DD HH:MM:SS"),
                            moment().format("YYYY-MM-DD HH:MM:SS")
                        ]);
                    }}
                >
                    All Time
                </Button>
            </div>
            {messages.length > 0 ? (
                messages.map((message, index) => {
                    return (
                        <div key={index}>
                            <ul>
                                <li>{message.text}</li>
                                <li>
                                    Sent by{" "}
                                    {users
                                        ? users.find(
                                              ({ telegram_id }) =>
                                                  telegram_id ===
                                                  message.telegram_id
                                          ).username
                                        : ""}
                                </li>
                                <li>
                                    Sent at:{" "}
                                    {moment(message.created_at).format(
                                        "DD MMMM YYYY HH:MM:SS"
                                    )}
                                </li>
                            </ul>
                        </div>
                    );
                })
            ) : (
                <HashLoader color={"#d4af37"} />
            )}
        </>
    );
};

export default Group;
