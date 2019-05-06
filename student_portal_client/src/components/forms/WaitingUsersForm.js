import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Button } from "semantic-ui-react";

import { approveUser, deleteUser } from "../../actions/user";

class WaitingUsersForm extends Component {
  constructor(props) {
    super(props);
    this.deleteUserHandler.bind(this);
  }
  approveUser = id => {
    this.props.approveUser(id).then(this.setState({}));
  };

  deleteUserHandler = id => {
    this.props.deleteUser(id);
  };
  render() {
    const { allUsers } = this.props.allUsers;
    return (
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Class</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>E-Mail</Table.HeaderCell>
              <Table.HeaderCell>User Status</Table.HeaderCell>
              <Table.HeaderCell>Approve Student</Table.HeaderCell>
              <Table.HeaderCell>Reject Student</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {allUsers.map(oneUser => {
              if (!oneUser.confirmed) {
                return (
                  <Table.Row key={oneUser._id}>
                    <Table.Cell>{oneUser.location}</Table.Cell>
                    <Table.Cell>{oneUser.studentClass}</Table.Cell>
                    <Table.Cell>{oneUser.firstName}</Table.Cell>
                    <Table.Cell>{oneUser.lastName}</Table.Cell>
                    <Table.Cell>{oneUser.email}</Table.Cell>
                    <Table.Cell>
                      {oneUser.confirmationEmailSend
                        ? "Approved"
                        : "Not Approved"}
                    </Table.Cell>

                    <Table.Cell>
                      <Button
                        onClick={this.approveUser.bind(this, oneUser._id)}
                        style={{
                          color: oneUser.confirmationEmailSend
                            ? "green"
                            : "#ec7f37"
                        }}
                      >
                        {oneUser.confirmationEmailSend
                          ? "Resend Email"
                          : "Approve"}
                      </Button>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        style={{
                          backgroundColor: "#ec7f37",
                          color: "white"
                        }}
                        onClick={deleteUser => {
                          if (window.confirm("Are you sure?"))
                            this.deleteUserHandler(oneUser._id, deleteUser);
                        }}
                      >
                        Reject
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              } else {
                return null;
              }
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

WaitingUsersForm.propTypes = {
  approveUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    allUsers: state.allUsers
  };
}

export default connect(
  mapStateToProps,
  { approveUser, deleteUser }
)(WaitingUsersForm);
