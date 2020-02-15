import React, { useEffect } from "react";

const UsersTable = ({ users }) => {
    useEffect(() => {
        console.log(users);
    }, []);
    return (
        <div>
            {users.map(user => {
                return <p>{user.telegram_id}</p>;
            })}
        </div>
    );
};

export default UsersTable;
