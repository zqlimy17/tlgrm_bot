import React from "react";
import { ScaleLoader } from "react-spinners";
import moment from "moment";

const Messages = ({ messages, loading, users }) => {
    if (loading) {
        return <ScaleLoader color={"#e37400"} />;
    }

    return (
        <React.Fragment>
            {messages.map(message => {
                return (
                    <ul key={message.id} className="list-group mb-4">
                        <li className="list-group-item">{message.text}</li>
                        <li className="list-group-item">
                            Sent by{" "}
                            {users
                                ? users.find(
                                      ({ telegram_id }) =>
                                          telegram_id === message.telegram_id
                                  ).username
                                : ""}
                        </li>
                        <li className="list-group-item">
                            Sent at:{" "}
                            {moment(message.created_at).format(
                                "DD MMMM YYYY HH:mm:ss"
                            )}
                        </li>
                    </ul>
                );
            })}
        </React.Fragment>
    );
};

export default Messages;
