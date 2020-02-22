import React from "react";
import TelegramLoginButton from "react-telegram-login";

const Login = () => {
    const handleTelegramResponse = response => {
        console.log(response);
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
