import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Group from "./pages/Group";
import UserContext from "./context/UserContext";
import Axios from "axios";

function App() {
    const x = 119940355;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fecthData = async () => {
            await Axios.get(
                `https://tlgrm-analytics-server.herokuapp.com/user/${x}`
            ).then(res => {
                setUser(res.data.user);
            });
        };
        fecthData();
    }, []);

    return (
        <Router>
            <UserContext.Provider value={user}>
                <div className="App">
                    <Navigation />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login/" component={Login} />
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
