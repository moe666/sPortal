import React, { Component } from "react";
import PropTypes from "prop-types";
import Validator from "validator";

import InlineError from "../messages/InlineError";

class RegistrationForm extends Component {
  state = {
    data: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      location: "",
      studentClass: ""
    },
    loading: false,
    errors: {}
  };

  types = ["Berlin", "Düsseldorf", "Köln", "Hamburg"];

  onChange = event =>
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value
      }
    });

  onSubmit = event => {
    event.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data).catch(error =>
        this.setState({
          errors: error.response.data.errors,
          loading: false
        })
      );
    }
  };

  //making syntax validation onSubmit();
  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    /*const { allUsers } = this.props;
    const locations = [];
    allUsers.map(user => {
      if (locations.indexOf(user.location) < 0) {
        locations.push(user.location);
      }
      return null;
    });*/

    return (
      <div className="loginForm">
        <form onSubmit={this.onSubmit} loading={loading.toString()}>
          <br />
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First name..."
            value={data.firstName}
            onChange={this.onChange}
          />

          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last name..."
            value={data.lastName}
            onChange={this.onChange}
          />
          <input
            type="number"
            min="0"
            id="studentClass"
            name="studentClass"
            placeholder="Class Number..."
            value={data.studentClass}
            onChange={this.onChange}
          />
          <input
            autoComplete="off"
            type="email"
            id="email"
            name="email"
            placeholder="Email..."
            autoComplete="email"
            value={data.email}
            onChange={this.onChange}
          />
          <br />
          {/* InlineError server side validation */}
          {errors.email && <InlineError text={errors.email} />}

          <input
            autoComplete="off"
            type="password"
            id="password"
            name="password"
            placeholder="Password..."
            autoComplete="current-password"
            value={data.password}
            onChange={this.onChange}
          />

          {errors.password && <InlineError text={errors.password} />}

          <br />
          <select
            name="location"
            onChange={this.onChange}
            className="DropDownSelect"
            required
          >
            <option value="">Choose location</option>
            {this.types.map((item, i) => (
              <option key={i}>{item}</option>
            ))}
          </select>

          <br />

          <button>Submit</button>
        </form>
      </div>
    );
  }
}
RegistrationForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default RegistrationForm;
