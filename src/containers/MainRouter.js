import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import Loading from "../components/Loading";
import { cleanNotification } from "../store/actions/notificationsActions";
// import Notifications from "react-notify-toast";
// import { notify } from "react-notify-toast";
import { HashRouter } from "react-router-dom";

import Login from "../containers/Login";
import { authCheckState, logout } from "../store/actions/authActions";
import AppRouted from "../AppRouted";

class MainRouter extends Component {
  componentDidMount() {
    this.props.authCheckState();
  }

  render() {
    const routes = this.props.isAuthenticated ? <AppRouted /> : <Login />;

    return (
      <div>
        <HashRouter>{routes}</HashRouter>
        {/* <Notifications options={{ zIndex: 200 }} /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    user: state.auth.user,
    message: state.notifications.message,
    error: state.notifications.error,
    redirectPath: state.notifications.redirectPath,
    loading: state.notifications.loading
  };
};

export default connect(
  mapStateToProps,
  { cleanNotification, authCheckState, logout }
)(MainRouter);
