import React, { useEffect } from "react";

const UsersTable = ({ users }) => {
    useEffect(() => {
        console.log(users);
    }, []);
    return <div></div>;
};

export default UsersTable;
