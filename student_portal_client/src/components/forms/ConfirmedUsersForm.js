import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Button } from "semantic-ui-react";

import { deleteUser } from "../../actions/user";

class ConfirmedUsersForm extends Component {
  constructor(props) {
    super(props);
    this.deleteUserHandler.bind(this);
  }

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
              <Table.HeaderCell>Delete Student</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {allUsers.map(oneUser => {
              if (oneUser.confirmed) {
                return (
                  <Table.Row key={oneUser._id}>
                    <Table.Cell>{oneUser.location}</Table.Cell>
                    <Table.Cell>{oneUser.studentClass}</Table.Cell>
                    <Table.Cell>{oneUser.firstName}</Table.Cell>
                    <Table.Cell>{oneUser.lastName}</Table.Cell>
                    <Table.Cell>{oneUser.email}</Table.Cell>
                    <Table.Cell className="adminTableBtn">
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
                        Delete Student
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

ConfirmedUsersForm.propTypes = {
  allUsers: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    allUsers: state.allUsers
  };
}

export default connect(
  mapStateToProps,
  { deleteUser }
)(ConfirmedUsersForm);
