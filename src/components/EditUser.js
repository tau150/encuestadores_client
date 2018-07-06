import React, { Component } from "react";
import { connect } from "react-redux";
import GridCard from "./GridCard";
import UserForm from "./UserForm";
import { updateUser } from "../store/actions/usersActions";

class EditUser extends Component {
  state = {
    userId: this.props.match.params.id,
    user: null
  };

  componentDidMount() {
    const user = this.props.allUsers.find(user => {
      return String(user.id) === String(this.props.match.params.id);
    });

    this.setState({ user });
  }

  handleEdit = user => {
    this.props.updateUser(user);
  };

  render() {
    if (!this.state.user) return null;
    return (
      <GridCard title={"Usuario"} subTitle={"Edición de Usuario"}>
        <UserForm
          user={this.state.user}
          userId={this.state.userId}
          handleAction={this.handleEdit}
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
  { updateUser }
)(EditUser);
