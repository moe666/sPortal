import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TopNavigation from "../navigation/TopNavigation";
import { confirm } from "../../actions/auth";

class ConfirmationPage extends Component {
  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    this.props
      .confirm(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  render() {
    const { loading, success } = this.state;
    const { firstName} = this.props.user;
    
    return (
      
        <div className="ConfirmationPageCont">
          <div className="ConfirmationNavigationBar">
            <TopNavigation />
          </div>
          <div className="ValidatingAndVerifiedCont">
            {loading && (
              <div className="ValidatingCont">
                <p>Validating your email</p>
              </div>
            )}
            {!loading && success && (
              <div className="verifiedCont">
                <h1>Dear {firstName},</h1>
                <br />
                <p>Your account is verified.</p>
                <br />
                
                  <Link to="/dashboard"> Go to your dashboard</Link>
                
              </div>
            )}

            {!loading && !success && (
              <div className="invalidToken">
                <h1>Oops. Invalid Token</h1>
              </div>
            )}
          </div>
        </div>
    );
  }
}

ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

function mapStateToProps(state) {

  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { confirm }
)(ConfirmationPage);
