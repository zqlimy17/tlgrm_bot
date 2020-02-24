import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Group from "./pages/Group";
import UserContext from "./context/UserContext";
import axios from "axios";

function App() {
    const [currentUserId, setCurrentUserId] = useState(738282366);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (currentUserId === null) {
            setUser(null);
        }
        const fetchData = async () => {
            await axios
                .get(`http://localhost:8080/user/${currentUserId}`)
                .then(res => {
                    setUser(res.data.user);
                });
        };
        fetchData();
    }, [currentUserId]);

    return (
        <Router>
            <UserContext.Provider value={{ user, setCurrentUserId }}>
                <div className="App">
                    <Navigation />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route
                            path="/dashboard/"
                            component={Dashboard}
                            setUser={setUser}
                        />
                        <Route path="/group/:id" component={Group} />
                    </Switch>
                </div>
            </UserContext.Provider>
        </Router>
    );
}

export default App;
