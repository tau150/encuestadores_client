import React, { Component } from "react";
import { connect } from "react-redux";
import GridCard from "./GridCard";
import UserForm from "./UserForm";
import { saveUser } from "../store/actions/usersActions";

class NewUser extends Component {
  handleSave = user => {
    this.props.saveUser(user);
  };

  render() {
    return (
      <GridCard title={"Usuario"} subTitle={"Creación de Usuario"}>
        <UserForm
          userId={null}
          handleAction={this.handleSave}
          allowNew={false}
        />
      </GridCard>
    );
  }
}

const mapStateToProps = state => {
  return {
    allUsers: state.users.users
  };
};
export default connect(
  mapStateToProps,
  { saveUser }
)(NewUser);
