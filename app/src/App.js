import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Group from "./pages/Group";

function App() {
    useEffect(() => {
        fetch("https://ec4fae08.ngrok.io/", {
            method: "get",
            headers: { "Content-Type": "application/json" }
        })
            .then(async c => {
                return c.json();
            })
            .then(data => {
                console.log(data);
            });
    }, []);

    return (
        <Router>
            <div className="App">
                <Navigation />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/login/">
                        <Login />
                    </Route>

                    <Route path="/dashboard/">
                        <Dashboard />
                    </Route>
                    <Route path="/group/:id">
                        <Group />
                    </Route>
                    {/* <Route
                        path={"/movie/:movieId"}
                        render={props => (
                            <OneMovie
                                {...props}
                                currentUser={this.state.currentUser}
                                userState={this.userState}
                            />
                        )}
                    /> */}
                </Switch>
            </div>
        </Router>
    );
}

export default App;
