/*import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import TopNavigation from '../navigation/TopNavigation'
import RegistrationForm from "../forms/RegistrationForm";
import { registration } from "../../actions/user";
import { Link } from "react-router-dom";
class RegistrationPage extends Component {
  submit = data =>
    this.props
      .registration(data)
      .then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <div className="RegistrationFormCont">
        <div className="navigation">
          <Link to="/" className="labelUserPage">
            <span className="labelD">DCI</span>
          </Link>
        </div>
        <div className="RegistrationModel">
          <p>
            You dont have a account yet. Please provide the following
            information below.
          </p>
          <p>We will contact you after reviewing your request</p>
          <RegistrationForm submit={this.submit} />
        </div>
      </div>
    );
  }
}

RegistrationPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  registration: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired
};

export default connect(
  null,
  { registration }
)(RegistrationPage);*/
