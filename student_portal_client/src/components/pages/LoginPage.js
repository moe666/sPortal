import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import Footer from "../navigation/Footer";
import LoginForm from "../forms/LoginForm";
import RegistrationForm from "../forms/RegistrationForm";
import { login } from "../../actions/auth";
import { registration } from "../../actions/user";

class LoginPage extends Component {
  submit = data =>
    this.props.login(data).then(() => this.props.history.push("/dashboard"));

  submitRegister = data =>
    this.props
      .registration(data)
      .then(() => this.props.history.push("/dashboard"));

  render() {
    let logoDCI = require("../../img/newDCILogo.png");
    return (
      <div>
        <div className="LoginCont">
          <div className="navigation">
            <div>
              <Link to="/user-card">
                <div className="label">
                  <div
                    id="dciLogoLogin"
                    style={{
                      backgroundImage: "url(" + logoDCI + ")",
                      backgroundPosition: "none"
                    }}
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className="LoginModel">
            <Tabs defaultActiveKey="loginStudent" id="uncontrolled-tab-example">
              <Tab eventKey="loginStudent" title="Sign In">
                <LoginForm submit={this.submit} />
                <div className="forgotPassDiv">
                  <Link to="/forgot_password">Forgot Password</Link>
                </div>
              </Tab>
              <Tab eventKey="registrationUser" title="Sign Up">
                <RegistrationForm submit={this.submitRegister} />
              </Tab>
            </Tabs>
          </div>
        </div>
        <div className="UserCardFooter">
          <Footer />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired,
  registration: PropTypes.func.isRequired
};

export default connect(
  null,
  { login, registration }
)(LoginPage);
