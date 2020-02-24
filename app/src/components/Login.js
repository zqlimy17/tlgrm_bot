import React, { useContext } from "react";
import TelegramLoginButton from "react-telegram-login";
import UserContext from "../context/UserContext";

const Login = () => {
    const { setCurrentUserId } = useContext(UserContext);
    const handleTelegramResponse = response => {
        setCurrentUserId(response.id);
    };

    return (
        <>
            <TelegramLoginButton
                dataOnauth={handleTelegramResponse}
                botName="tlgrm_ga_bot"
            />
        </>
    );
};

export default Login;
