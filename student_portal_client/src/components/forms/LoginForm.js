import React, { Component } from "react";
import PropTypes from "prop-types";
import Validator from "validator";

import InlineError from "../messages/InlineError";

class LoginForm extends Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

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

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <div className="loginForm">
        <form onSubmit={this.onSubmit} loading={loading.toString()}>
          {errors.global && <p id="globalError">{errors.global}</p>}

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email..."
            // autoComplete="email"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
          <br />
          <input
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
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
