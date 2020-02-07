import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Chart from "./components/Playground";

function App() {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/playground">
                        <Chart />
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
