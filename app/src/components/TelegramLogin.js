import React from "react";
import TelegramLoginButton from "react-telegram-login";

const TelegramLogin = () => {
    const handleTelegramResponse = response => {};
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
