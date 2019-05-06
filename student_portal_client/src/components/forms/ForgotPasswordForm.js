import React, { Component } from "react";
import PropTypes from "prop-types";
import Validator from "validator";

import InlineError from "../messages/InlineError";

class ForgotPasswordForm extends Component {
  state = {
    data: {
      email: ""
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
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <div className="ForgotPasswordForm">
        <p className="Forgot-Password">Forgot Password</p>
        <p className="Forgot-Password-Sub">Please insert your email</p>

        {!!errors.global && <p id="globalError">{errors.global}</p>}
        <form onSubmit={this.onSubmit} loading={loading.toString()}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            autoComplete="email"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
          <br />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm;
