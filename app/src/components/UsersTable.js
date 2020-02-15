import React from "react";

const UsersTable = ({ users }) => {
    return (
        <div>
            {users.map((user, index) => {
                return (
                    <div key={index}>
                        <p>ID: {user.telegram_id}</p>
                        <p>Username:{user.username}</p>
                        <p>First Name: {user.first_name}</p>
                        <p>Last Name: {user.last_name}</p>
                        <p>Status: {user.chat_user_status}</p>
                        <p>
                            Messages:{" "}
                            {user.log_count +
                                user.video_count +
                                user.voice_count +
                                user.location_count +
                                user.doc_count +
                                user.image_count}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default UsersTable;
