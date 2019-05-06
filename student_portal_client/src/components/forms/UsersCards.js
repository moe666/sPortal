import React, { Component } from "react";
import { connect } from "react-redux";

class UserCards extends Component {
  constructor(props, context) {
    super(props, context);
    this.locationsRef = React.createRef();
    this.availabilityRef = React.createRef();
    this.mainFocusRef = React.createRef();

    this.state = {
      location: "",
      availability: "",
      mainFocus: ""
    };
  }

  updateSearch = selectedOption => {
    this.setState({
      location: this.locationsRef.current.value,
      availability: this.availabilityRef.current.value,
      mainFocus: this.mainFocusRef.current.value
    });
  };
  render() {
    const { allUsers } = this.props.allUsers;
    const locations = [];
    const mainFocus = [];

    const filteredLocations = allUsers.filter(user => {
      let validLocation = true;
      let validAvailability = true;
      let validMainFocus = true;

      if (this.state.location !== "") {
        validLocation = user.location.indexOf(this.state.location) !== -1;
      }
      if (this.state.availability !== "") {
        if (typeof user.availability == "string") {
          let currentDate = new Date();
          let userDate = new Date(user.availability);
          if (this.state.availability === "current") {
            validAvailability = currentDate >= userDate;
          } else {
            validAvailability = userDate > currentDate;
          }
        } else {
          validAvailability = false;
        }
      }

      if (this.state.mainFocus !== "") {
        validMainFocus = user.mainFocus.indexOf(this.state.mainFocus) !== -1;
      }
      return validLocation && validAvailability && validMainFocus;
    });

    allUsers.map(user => {
      if (locations.indexOf(user.location) < 0) {
        locations.push(user.location);
      }
      return null;
    });

    allUsers.map(user => {
      if (mainFocus.indexOf(user.mainFocus) < 0 && user.mainFocus !== "") {
        mainFocus.push(user.mainFocus);
      }
      return null;
    });
    let placeholderUrl = require("../../img/placeholderUser.png");

    return (
      <div>
        <div>
          <select
            className="DropDownSelect"
            name="location"
            onChange={this.updateSearch}
            ref={this.locationsRef}
          >
            <option value="">All Locations</option>
            {locations.map(item => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            className="DropDownSelect"
            name="mainFocus"
            onChange={this.updateSearch}
            ref={this.mainFocusRef}
          >
            <option value="">All Focus</option>
            {mainFocus.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            className="DropDownSelect"
            name="availability"
            onChange={this.updateSearch}
            ref={this.availabilityRef}
          >
            <option value="">All Availabilities</option>
            <option value="current">Currently Available</option>
            <option value="future">Future Available</option>
          </select>
        </div>
        <div className="UserCardsItems">
          {filteredLocations.map(oneUser => {
            let currentDate = new Date().toLocaleString();
            let date = new Date(oneUser.availability);
            let newUserDate = date.toLocaleString();
            const availability = date.toDateString();

            if (oneUser.confirmed) {
              return (
                <div className="CardItem" key={oneUser._id}>
                  {oneUser.userImage === "" ? (
                    <div
                      className="profileImg"
                      style={{
                        backgroundImage: "url(" + placeholderUrl + ")"
                      }}
                    />
                  ) : (
                    <div
                      className="profileImg"
                      style={{
                        backgroundImage:
                          "url(" +
                          `http://localhost:8080/uploads/${oneUser.userImage}` +
                          ")"
                      }}
                    />
                  )}

                  <div className="userName">
                    <p>{oneUser.firstName}</p>
                    <p> {oneUser.lastName}</p>
                    <div className="mainFocusCont">
                      {<p className="mainFocusItem">{oneUser.mainFocus}</p>}
                    </div>
                  </div>
                  <div className="locationAndAvailability">
                    <div className="location">{oneUser.location}</div>
                    <div className="Availability">
                      <p>Availability</p>
                      {oneUser.availability === null ? (
                        <p key="0" style={{ color: "grey" }}>
                          No info yet
                        </p>
                      ) : (
                        [
                          newUserDate > currentDate ? (
                            <p key="1" style={{ color: "white" }}>
                              {availability}
                            </p>
                          ) : (
                            <p key="2" style={{ color: "green" }}>
                              Available for offers
                            </p>
                          )
                        ]
                      )}
                    </div>
                  </div>
                  <div className="CardLinks">
                    {oneUser.linkedInLink !== "" ? (
                      <div>
                        <a
                          title="Linked In"
                          rel="noopener noreferrer"
                          target="_blank"
                          href={`${oneUser.linkedInLink}`}
                        >
                          <img
                            src={require("../../img/linkedin.png")}
                            alt=""
                          />
                        </a>
                      </div>
                    ) : null}
                    {oneUser.githubLink !== "" ? (
                      <div>
                        <a
                          title="GitHub"
                          rel="noopener noreferrer"
                          target="_blank"
                          href={`${oneUser.githubLink}`}
                        >
                          <img
                            src={require("../../img/github.png")}
                            alt=""
                          />
                        </a>
                      </div>
                    ) : null}
                    {oneUser.xingLink !== "" ? (
                      <div>
                        <a
                          title="Xing"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`${oneUser.xingLink}`}
                        >
                          <img
                            src={require("../../img/xing.png")}
                            alt=""
                          />
                        </a>
                      </div>
                    ) : null}
                    {oneUser.portfolioLink !== "" ? (
                      <div>
                        <a
                          title="Portfolio"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`${oneUser.portfolioLink}`}
                        >
                          <img
                            src={require("../../img/briefcase.png")}
                            alt=""
                          />
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allUsers: state.allUsers
  };
}

export default connect(mapStateToProps)(UserCards);
