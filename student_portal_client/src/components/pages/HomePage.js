import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../actions/auth";
class HomePage extends Component {
  render() {
    const { isAuthenticated, logout } = this.props;
    return (
      <div>
        <div className="container-app" />
        <div className="centerWelcomeCont">
          <div className="textCont">
            <button>
              <Link to="/user-card">
                <div className="backgroundCircle" />
                <h1>Digital Career Institute</h1>
                <hr />
                <h3>Alumni Book</h3>
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    user: state.user
  };
}
export default connect(
  mapStateToProps,
  { logout: actions.logout }
)(HomePage);
