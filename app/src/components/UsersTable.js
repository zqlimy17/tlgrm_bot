import React from "react";
import UserTablePhoto from "./UserTablePhoto";

const UsersTable = ({ users }) => {
    return (
        <div className="py-3 mb-4">
            <h1>Members</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th style={{ width: "8%" }}>Profile</th>
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
                                <td className="align-middle">
                                    <UserTablePhoto user={user} />
                                </td>
                                <td className="align-middle">
                                    {user.telegram_id}
                                </td>
                                <td className="align-middle">
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
                                <td className="align-middle">
                                    {user.first_name}
                                </td>
                                <td className="align-middle">
                                    {user.last_name}
                                </td>
                                <td className="align-middle">
                                    {user.chat_user_status}
                                </td>
                                <td className="align-middle">
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
