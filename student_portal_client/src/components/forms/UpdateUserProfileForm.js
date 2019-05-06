import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class UpdateUserProfileForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.firstNameRef = React.createRef();
    this.lastNameRef = React.createRef();
    // this.emailRef = React.createRef();
    // this.locationRef = React.createRef();
    this.studentClassRef = React.createRef();
    this.linkedInLinkRef = React.createRef();
    this.githubLinkRef = React.createRef();
    this.xingLinkRef = React.createRef();
    this.portfolioLinkRef = React.createRef();
    this.availabilityRef = React.createRef();
    this.mainFocusRef = React.createRef();
  }

  state = {
    show: false,
    startDate: this.props.user.availability
      ? new Date(this.props.user.availability)
      : null,
    id: this.props.user._id,
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    location: this.props.user.location,
    studentClass: this.props.user.studentClass,
    userImage: this.props.user.userImage,
    githubLink: this.props.user.githubLink,
    linkedInLink: this.props.user.linkedInLink,
    portfolioLink: this.props.user.portfolioLink,
    xingLink: this.props.user.xingLink,
    availability: this.props.user.availability,
    mainFocus: this.props.user.mainFocus
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user._id !== prevState.id) {
      return {
        startDate: nextProps.user.availability
          ? new Date(nextProps.user.availability)
          : null,
        id: nextProps.user._id,
        firstName: nextProps.user.firstName,
        lastName: nextProps.user.lastName,
        location: nextProps.user.location,
        studentClass: nextProps.user.studentClass,
        userImage: nextProps.user.userImage,
        githubLink: nextProps.user.githubLink,
        linkedInLink: nextProps.user.linkedInLink,
        portfolioLink: nextProps.user.portfolioLink,
        xingLink: nextProps.user.xingLink,
        availability: nextProps.user.availability,
        mainFocus: nextProps.user.mainFocus
      };
    } else return null;
  }

  types = ["Berlin", "Düsseldorf", "Köln", "Hamburg"];
  focus = ["Front-End", "Back-End", "Full-Stack"];

  onChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  static defaultProps = {
    initialValue: 0
  };

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({
      show: true
    });
  }
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const updatedUser = {
      id: this.state.id,
      availability: this.state.startDate,
      firstName: this.firstNameRef.current.value,
      lastName: this.lastNameRef.current.value,
      githubLink: this.githubLinkRef.current.value,
      linkedInLink: this.linkedInLinkRef.current.value,
      location: this.state.location,
      portfolioLink: this.portfolioLinkRef.current.value,
      studentClass: this.studentClassRef.current.value,
      xingLink: this.xingLinkRef.current.value,
      mainFocus: this.state.mainFocus
    };
    this.props.updateProfile(updatedUser);
    this.handleClose();
  };

  render() {
    return (
      <div>
        <div variant="primary" onClick={this.handleShow}>
          {/*<img src={require("../../img/edit-icon.svg")} alt="" />*/}
          UPDATE PROFILE
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Your Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  ref={this.firstNameRef}
                  type="text"
                  name="firstName"
                  defaultValue={this.state.firstName}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  ref={this.lastNameRef}
                  type="text"
                  name="lastName"
                  defaultValue={this.state.lastName}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Class</Form.Label>
                <Form.Control
                  ref={this.studentClassRef}
                  type="text"
                  name="studentClass"
                  defaultValue={this.state.studentClass}
                />
              </Form.Group>

              {/*Main Focus*/}
              <select name="mainFocus" onChange={this.onChange}>
                {this.state.mainFocus === "" ? (
                  <option>Not updated</option>
                ) : (
                  <option defaultValue>{this.state.mainFocus}</option>
                )}
                {this.focus.map((item, i) => {
                  if (item !== this.state.mainFocus) {
                    return <option key={i}>{item}</option>;
                  }
                })}
              </select>
              {/*Location*/}
              <select name="location" onChange={this.onChange}>
                <option defaultValue>{this.state.location}</option>
                {this.types.map((item, i) => {
                  if (item !== this.state.location) {
                    return <option key={i}>{item}</option>;
                  }
                })}
              </select>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Availability</Form.Label>
                <br />
                <DatePicker
                  ref={this.availabilityRef}
                  popperClassName="drv-datepicker-popper"
                  autoComplete="off"
                  type="text"
                  name="availability"
                  dateFormat="MMMM d, yyyy"
                  showYearDropdown
                  dateFormatCalendar="MMMM YYYY"
                  scrollableYearDropdown
                  yearDropdownItemNumber={10}
                  onChange={this.handleChange}
                  placeholderText="Select your availability..."
                  selected={this.state.startDate}
                  showDisabledMonthNavigation
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>LinkedIn</Form.Label>
                <p>
                  Please use only the following
                  format(https://www.linkedin.com/yourprofile)
                </p>
                <Form.Control
                  ref={this.linkedInLinkRef}
                  type="url"
                  name="linkedInLink"
                  pattern="https://.*"
                  defaultValue={this.state.linkedInLink}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Github</Form.Label>
                <p>
                  Please use only the following
                  format(https://www.github.com/yourprofile)
                </p>
                <Form.Control
                  ref={this.githubLinkRef}
                  type="url"
                  name="githubLink"
                  pattern="https://.*"
                  defaultValue={this.state.githubLink}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Xing</Form.Label>
                <p>
                  Please use only the following
                  format(https://www.xing.com/yourprofile)
                </p>
                <Form.Control
                  ref={this.xingLinkRef}
                  type="url"
                  name="xingLink"
                  pattern="https://.*"
                  defaultValue={this.state.xingLink}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Portfolio</Form.Label>
                <p>
                  Please use only the following
                  format(https://www.youportfolio.com)
                </p>
                <Form.Control
                  ref={this.portfolioLinkRef}
                  type="url"
                  name="portfolioLink"
                  pattern="https://.*"
                  defaultValue={this.state.portfolioLink}
                />
              </Form.Group>

              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

UpdateUserProfileForm.propTypes = {
  updateProfile: PropTypes.func.isRequired
};

export default UpdateUserProfileForm;
