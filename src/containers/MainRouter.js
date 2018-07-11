import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../components/Loading";
import { cleanNotification } from "../store/actions/notificationsActions";
import Notifications from "react-notify-toast";
import { notify } from "react-notify-toast";
import Login from "../containers/Login";
import App from "../App";

class MainRouter extends Component {
  state = {
    loggedIn: false
  };

  componentDidMount() {
    if (this.props.message) {
      notify.show(this.props.message, "success", 2000);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      notify.show(
        nextProps.message,
        nextProps.error ? "error" : "success",
        2000
      );

      if (nextProps.redirectPath) {
        this.props.history.push(nextProps.redirectPath);
      }

      this.props.cleanNotification();
    }
  }

  render() {
    const routes = localStorage.getItem("token") ? <App /> : <Login />;

    return (
      <div>
        <Notifications options={{ zIndex: 200 }} />
        {routes}
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
  { cleanNotification }
)(MainRouter);
