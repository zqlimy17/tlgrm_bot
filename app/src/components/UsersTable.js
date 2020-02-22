import React from "react";

const UsersTable = ({ users }) => {
    return (
        <div className="py-3 mb-4">
            <h1>Members</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Status</th>
                        <th>Messages</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{user.telegram_id}</td>
                                <td>
                                    {user.username ? (
                                        <a
                                            href={`https://t.me/${user.username}`}
                                        >
                                            @{user.username}
                                        </a>
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.chat_user_status}</td>
                                <td>
                                    {user.log_count +
                                        user.video_count +
                                        user.voice_count +
                                        user.location_count +
                                        user.doc_count +
                                        user.image_count}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
