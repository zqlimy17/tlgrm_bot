import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import moment from "moment";
import Messages from "../components/Messages";
import Pagination from "../components/Pagination";
import Dates from "../components/Dates";
import GroupStats from "../components/GroupStats";
import MediaTypes from "../components/MediaTypes";
import Activity from "../components/Activity";
import UsersTable from "../components/UsersTable";
import ActiveTime from "../components/ActiveTime";
import UsersMessagePie from "../components/UsersMessagePie";
import ActiveDays from "../components/ActiveDays";
import GroupPhoto from "../components/GroupPhoto";

const Group = () => {
    let { id } = useParams();
    const [group, setGroup] = useState();
    const [users, setUsers] = useState(null);
    const [showDate, setShowDate] = useState(30);

    // Media
    const [media, setMedia] = useState();
    const [messages, setMessages] = useState([]);

    // Pagination
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [messagesPerPage] = useState(20);
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
                url: "https://tlgrm-analytics-server.herokuapp.com/group",
                data: {
                    id: id,
                    then: dateRange[0],
                    now: dateRange[1]
                }
            });
            await setMedia(res.data.media);
            const { logs } = res.data.media;
            logs.reverse();
            await setGroup(res.data.chat[0]);
            await setUsers(res.data.users);
            await setMessages(logs);
            setLoading(false);
            console.log(res.data.media);
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
                {group ? group.chat_name : <ScaleLoader color={"#e37400"} />}
            </h1>
            <GroupPhoto id={id} />
            {users ? (
                <UsersTable users={users} />
            ) : (
                <ScaleLoader color={"#e37400"} />
            )}
            {group ? (
                <Dates
                    setDateRange={setDateRange}
                    setShowDate={setShowDate}
                    messages={messages}
                />
            ) : (
                <ScaleLoader color={"#e37400"} />
            )}
            {media ? (
                <Activity media={media} showDate={showDate} />
            ) : (
                <ScaleLoader color={"#e37400"} />
            )}
            {media ? (
                <ActiveDays media={media} />
            ) : (
                <ScaleLoader color={"#e37400"} />
            )}
            {media ? (
                <ActiveTime media={media} />
            ) : (
                <ScaleLoader color={"#e37400"} />
            )}
            {group ? (
                <MediaTypes media={media} dateRange={dateRange} />
            ) : (
                <ScaleLoader color={"#e37400"} />
            )}
            <h2>Media Goes here</h2>
            {group ? (
                <GroupStats group={group} media={media} />
            ) : (
                <ScaleLoader color={"#e37400"} />
            )}
            {users ? (
                <UsersMessagePie users={users} />
            ) : (
                <ScaleLoader color={"#e37400"} />
            )}

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
