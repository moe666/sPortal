import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import UserDashboardPage from "./UserDashboardPage";
import AdminDashboardPage from "./AdminDashboardPage";
import { getUserData } from "../../actions/user";

class Dashboard extends Component {
  componentDidMount() {
    const { email } = this.props.user;
    this.props.getUserData(email);
  }

  render() {
    const { isConfirmed, isAdmin, user } = this.props;
    console.log("user from dashboard", user);

    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage user={user} />}
        {!isAdmin && isConfirmed ? <UserDashboardPage /> : null}
        {isAdmin ? <AdminDashboardPage /> : null}
      </div>
    );
  }
}

Dashboard.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  getUserData: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    isConfirmed: !!state.user.confirmed,
    isAdmin: !!state.user.isAdmin
  };
}

export default connect(
  mapStateToProps,
  { getUserData }
)(Dashboard);
