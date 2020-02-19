import React from "react";
import { Link } from "react-router-dom";

const Navigation = currentUser => {
    currentUser = false;
    return (
        <div className="sticky-top">
            <nav className="navbar custom-nav navbar-expand-lg">
                <Link className="navbar-brand" to="/">
                    <img
                        src="/img/logo192.png"
                        alt="Logo"
                        width="30"
                        height="30"
                        className="mr-3"
                    />
                    TLGRM Analytics
                </Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item px-1">
                            <Link className="nav-link" to="/dashboard">
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navigation;
