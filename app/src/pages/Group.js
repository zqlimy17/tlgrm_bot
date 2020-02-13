import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { HashLoader } from "react-spinners";
import moment from "moment";
import Messages from "../components/Messages";
import Pagination from "../components/Pagination";
import Dates from "../components/Dates";
import GroupSize from "../components/Bar";
import GroupStats from "../components/GroupStats";

const Group = () => {
    let { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [messagesPerPage] = useState(20);
    const [group, setGroup] = useState();
    const [users, setUsers] = useState(null);
    const [dateRange, setDateRange] = useState([
        moment()
            .subtract(30, "day")
            .format("YYYY-MM-DD HH:mm:ss"),
        moment().format("YYYY-MM-DD HH:mm:ss")
    ]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await axios({
                method: "post",
                url: "http://localhost:4040/group",
                data: {
                    id: id,
                    then: dateRange[0],
                    now: dateRange[1]
                }
            });
            const reverse = res.data.logs;
            reverse.reverse();
            await setMessages(reverse);
            await setGroup(res.data.chat[0]);
            await setUsers(res.data.users);
            setLoading(false);
        };
        fetchData();
    }, [dateRange, id]);

    // Get Current Messages
    const indexOfLastMessage = currentPage * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentMessage = messages.slice(
        indexOfFirstMessage,
        indexOfLastMessage
    );

    // Change Page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <h1>
                {group ? group.chat_name : <HashLoader color={"#d4af37"} />}
            </h1>
            {group ? (
                <GroupStats group={group} messages={messages} />
            ) : (
                <HashLoader color={"#d4af37"} />
            )}
            <GroupSize />
            <Dates setDateRange={setDateRange} />
            <Messages
                messages={currentMessage}
                loading={loading}
                users={users}
            />
            <Pagination
                messagesPerPage={messagesPerPage}
                totalMessages={messages.length}
                paginate={paginate}
            />
        </>
    );
};

export default Group;
