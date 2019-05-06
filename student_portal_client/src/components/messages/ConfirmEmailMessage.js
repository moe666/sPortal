import React, { Component } from "react";
import TopNavigation from "../navigation/TopNavigation";

class ConfirmEmailMessage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="ConfirmEmailMessageCont">
        <div className="navigationBarUserPage">
          <TopNavigation />
        </div>
        <div className="ConfirmEmailMessage">
          <h1>
            <div style={{ color: "#da9446" }}>
              Dear {this.props.user.firstName},
            </div>
            <p style={{ marginTop: "50px" }}>
              Thank you for taking time to register with DCI Students Book.
            </p>
              <p>We will now verify your profile.</p>
            <p>
              You will get a notification as soon as your profile has been
              verified.
            </p>
            <p style={{ marginTop: "50px" }}>Best regards,</p>
            <p style={{ color: "#da9446" }}>DCI-Team</p>
          </h1>
        </div>
      </div>
    );
  }
}

export default ConfirmEmailMessage;
