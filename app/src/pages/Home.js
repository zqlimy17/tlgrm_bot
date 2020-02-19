import React from "react";
import { Jumbotron, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faChartArea,
    faCogs,
    faArrowRight
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    return (
        <>
            <div className="container-fluid home">
                <div className="px-5">
                    <div className="px-5">
                        <div className="px-5">
                            <Row className="py-5">
                                <Col sm className="py-5">
                                    <div className="py-5">
                                        <div className="py-5">
                                            <div className="display-4">
                                                Hello, this is <br />
                                                TLGRM Analytics
                                            </div>
                                            <h6>
                                                We help you to keep track of
                                                your Telegram and actionable
                                                information. Unleash the
                                                potential of group chats with
                                                TLGRM Analytics.
                                            </h6>
                                            <Button className="px-5 btn-lg btn-warning">
                                                START
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm />
                            </Row>
                            <Row>
                                <Col className="mx-2 py-3 my-3 feature-header">
                                    <div className="mt-3 px-5">
                                        <Row>
                                            <Col className="col-sm-4">
                                                <h1>
                                                    <strong>FEATURES</strong>
                                                </h1>
                                                <p>
                                                    Use our analytics dashboard
                                                    to learn more about the user
                                                    insights that revolve around
                                                    your group. Useful for
                                                    administrators, community
                                                    managers and your group
                                                    users. Never miss anything
                                                    noteworthy.
                                                </p>
                                            </Col>
                                            <Col className="col-sm-8" />
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="feature mx-2 text-center py-3">
                                    <FontAwesomeIcon
                                        icon={faCogs}
                                        className="mx-3"
                                        size="6x"
                                        color="#fab41d"
                                    />
                                    <h2 className="pt-2">
                                        <strong>INSIGHTFUL DATA</strong>
                                    </h2>
                                    <h5>
                                        <strong>
                                            Build a complete picture.
                                        </strong>
                                    </h5>
                                    <p>
                                        Understand your site and app users to
                                        better evaluate the performance of your
                                        marketing, content, products, and more.
                                    </p>
                                </Col>
                                <Col className="feature mx-2 text-center py-3">
                                    <FontAwesomeIcon
                                        icon={faChartArea}
                                        className="mx-3"
                                        size="6x"
                                        color="#fab41d"
                                    />
                                    <h2 className="pt-2">
                                        <strong>GRAPHICAL REPORTS</strong>
                                    </h2>
                                    <h5>
                                        <strong>
                                            Connect your insights to results.
                                        </strong>
                                    </h5>
                                    <p>
                                        View Hourly, Daily, Weekly, and Monlthy
                                        activity. <br />
                                        See the type of files sent in your
                                        Group.
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>

                <Row className="how-it-works my-4 py-5">
                    <div className="col-sm-4 p-3">
                        <h1 className="text-center mt-4">
                            <strong>HOW IT WORKS</strong>
                        </h1>
                    </div>
                    <div className="col-sm-8 how-it-works-text">
                        <p className="lead pt-3 px-3 mr-5">
                            TLGRM Analytics uses our <a href="#">@tlgrm_ga</a>{" "}
                            bot that keeps track of data such as text messages,
                            images, videos, voice messages, locations,
                            documents, and more.
                        </p>
                        <p className="pl-3">
                            Read our Privacy Policy <a href="#">here</a>.
                        </p>
                    </div>
                </Row>
                <div className="px-5">
                    <div className="px-5">
                        <Row className="m-auto text-center container-fluid py-3">
                            <Col>
                                <div className="display-4">
                                    <strong>PRICING</strong>
                                </div>
                                <Row className="py-3">
                                    <Col sm className="pricing mx-3 py-3">
                                        <h2 className="pricing-header">
                                            <strong>Basic</strong>
                                        </h2>
                                        <hr />
                                        <h3>Free</h3>
                                        <div className="text-left ml-5">
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="mx-3"
                                            />{" "}
                                            Analytics Tool
                                            <br />
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="mx-3"
                                            />{" "}
                                            Exporting Reports
                                        </div>
                                    </Col>
                                    <Col sm className="pricing-pro mx-3 py-3">
                                        <h2 className="pricing-header">
                                            <strong>Pro</strong>
                                        </h2>
                                        <hr />
                                        <h3>$10 /month</h3>
                                        <div className="text-left ml-5">
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="mx-3"
                                            />{" "}
                                            Analytics Tool
                                            <br />
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="mx-3"
                                            />{" "}
                                            Exporting Reports
                                            <br />
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="mx-3"
                                            />{" "}
                                            Email/Phone Support
                                            <br />
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="mx-3"
                                            />{" "}
                                            White-Labelling
                                        </div>
                                    </Col>
                                    <Col sm className="pricing mx-3 py-3">
                                        <h2 className="pricing-header">
                                            <strong>Enterprise</strong>
                                        </h2>
                                        <hr />
                                        <h3>$50 /month</h3>
                                        <div className="text-left ml-5">
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="mx-3"
                                            />{" "}
                                            Analytics Tool
                                            <br />
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="mx-3"
                                            />{" "}
                                            Exporting Reports
                                            <br />
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="mx-3"
                                            />{" "}
                                            Email/Phone Support
                                            <br />
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="mx-3"
                                            />{" "}
                                            White-Labelling
                                            <br />
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="mx-3"
                                            />{" "}
                                            24/7 Super Support
                                            <br />
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="mx-3"
                                            />{" "}
                                            Beta Features
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
                <Row className="try-cta p-5 ">
                    <Col className="text-center p-5 mx-5">
                        <div className="display-2 pb-5">
                            Enhance your data with TLGRM Analytics today!
                        </div>
                        <Button className="px-5 btn-lg btn-block btn-warning">
                            TRY FOR FREE{" "}
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="mx-3"
                            />
                        </Button>
                    </Col>
                </Row>
                <Row className="text-center footer">
                    <footer className="pt-2">
                        <h6>ZQLIMY x General Assembly</h6>
                    </footer>
                </Row>
            </div>
        </>
    );
};

export default Home;
