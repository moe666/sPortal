import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllUsers, filterLocation, getUserData } from "../../actions/user";
import TopNavigation from "../navigation/TopNavigation";
import UsersCards from "../forms/UsersCards";
import Footer from "../navigation/Footer";

class UserCardParent extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    let { isAuthenticated } = this.props;
    const { allUsers } = this.props.allUsers;
    let logoDCI = require("../../img/newDCILogo.png");

    return (
      <div className="UserCardsCont">
        <div className="navigationBarUserCardPage">
          {isAuthenticated && <TopNavigation />}
          {!isAuthenticated && (
            <div className="navigationBar">
              <Link to="/user-card">
                <div className="label">
                  <div
                    id="dciLogo"
                    style={{
                      backgroundImage: "url(" + logoDCI + ")"
                    }}
                  />
                </div>
              </Link>
              <ul>
                <li>
                  <Link to="/login">
                    <span>Login</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="UserCardsListCont">
          <h1>OUR STUDENTS</h1>

          <UsersCards allUsers={allUsers} />
        </div>
        <div className="UserCardFooter">
          <Footer />
        </div>
      </div>
    );
  }
}

UserCardParent.propTypes = {
  allUsers: PropTypes.object.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  oneUser: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    allUsers: state.allUsers,
    oneUser: state.oneUser,
    isAuthenticated: !!state.user.token
  };
}

export default connect(
  mapStateToProps,
  { getAllUsers, filterLocation, getUserData }
)(UserCardParent);
