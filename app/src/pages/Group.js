import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

const Group = () => {
    let { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [group, setGroup] = useState();
    useEffect(async () => {
        console.log(`http://localhost:4040/group/${id}`);
        let res = await axios.get(`http://localhost:4040/group/${id}`);
        let reverse = res.data.logs;
        reverse.reverse();
        await setMessages(reverse);
        await setGroup(res.data.chat);
        console.log("RES DATA CHAT IS", res.data.chat);
    }, []);
    return (
        <>
            <h1>{group ? group.chat_name : ""}</h1>
            {console.log(
                "messages is: ",
                messages.length > 0 ? messages[0].created_at : ""
            )}
            {messages.slice(0, 20).map(message => {
                return (
                    <div>
                        <p>{message.text}</p>
                    </div>
                );
            })}
        </>
    );
};

export default Group;
