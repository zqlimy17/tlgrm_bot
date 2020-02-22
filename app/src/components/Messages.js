import React from "react";
import { ScaleLoader } from "react-spinners";
import moment from "moment";

const Messages = ({ messages, loading, users }) => {
    if (loading) {
        return <ScaleLoader color={"#e37400"} />;
    }

    return (
        <div className="py-3 mb-4">
            <h1>Messages</h1>
            {messages.map((message, index) => {
                return (
                    <ul key={index} className="list-group mb-4">
                        <li
                            className={
                                index % 2
                                    ? "list-group-item list-group-item-secondary pb-0"
                                    : "list-group-item pb-0"
                            }
                        >
                            <strong>{message.text}</strong>
                        </li>
                        <li
                            className={
                                index % 2
                                    ? "list-group-item list-group-item-secondary pt-0"
                                    : "list-group-item pt-0"
                            }
                        >
                            <small>
                                {users
                                    ? users.find(
                                          ({ telegram_id }) =>
                                              telegram_id ===
                                              message.telegram_id
                                      ).username
                                    : ""}{" "}
                                ||{" "}
                                {moment(message.created_at).format(
                                    "DD MMMM YYYY HH:mm:ss"
                                )}
                            </small>
                        </li>
                    </ul>
                );
            })}
        </div>
    );
};

export default Messages;
