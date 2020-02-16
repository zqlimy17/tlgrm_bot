import React from "react";
import TelegramLoginButton from "react-telegram-login";

const TelegramLogin = () => {
    const handleTelegramResponse = response => {
        console.log(response);
    };
    return (
        <div>
            <TelegramLoginButton
                dataOnauth={handleTelegramResponse}
                botName="tlgrm_ga"
            />
        </div>
    );
};

export default TelegramLogin;
