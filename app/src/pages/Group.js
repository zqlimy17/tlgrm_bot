import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

const Group = () => {
    let { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [group, setGroup] = useState();
    useEffect(() => {
        console.log(`http://localhost:4040/group/${id}`);
        axios.get(`http://localhost:4040/group/${id}`).then(res => {
            let reverse = res.data.logs;
            reverse.reverse();
            setMessages(reverse);
            setGroup(res.data.chat);
            console.log("RES DATA CHAT IS", res.data.chat);
        });
    }, []);
    return (
        <>
            <h1></h1>
            {console.log(group)}
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
