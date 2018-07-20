import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Notifications from "react-notify-toast";
import { notify } from "react-notify-toast";
import Home from "./components/Home";
import LayoutSimple from "./components/LayoutSimple";
import UsersIndex from "./containers/UsersIndex";
import EditUser from "./containers/EditUser";
import NewUser from "./containers/NewUser";
import { authCheckState, logout } from "./store/actions/authActions";
import { cleanNotification } from "./store/actions/notificationsActions";
import Loading from "./components/Loading";
import ChangePassword from "./containers/ChangePassword";
import PollsIndex from "./containers/PollsIndex";
import NewPoll from "./containers/NewPoll";
import EditPoll from "./containers/EditPoll";
import PollstersIndex from "./containers/PollstersIndex";
import NewPollster from "./containers/NewPollster";

class AppRouted extends Component {
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

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    let routes;

    if (this.props.user.role_id === 1) {
      routes = (
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/usuarios" exact component={UsersIndex} />
          <Route path="/usuarios/nuevo" exact component={NewUser} />
          <Route path="/usuarios/:id" component={EditUser} />
          <Route path="/cambiarClave" exact component={ChangePassword} />
          <Route path="/encuestas" exact component={PollsIndex} />
          <Route path="/encuestas/nuevo" exact component={NewPoll} />
          <Route path="/encuestas/:id" exact component={EditPoll} />
          <Route path="/encuestadores" exact component={PollstersIndex} />
          <Route path="/encuestadores/nuevo" exact component={NewPollster} />
          <Redirect to="/" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/test" component={Home} />
          <Route path="/cambiarClave" exact component={ChangePassword} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Loading open={this.props.loading} />
        <Notifications options={{ zIndex: 200 }} />
        <LayoutSimple
          userName={localStorage.getItem("userEmail")}
          logout={this.handleLogout}
          role={this.props.user.role_id}
        >
          {routes}
        </LayoutSimple>
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

export default withRouter(
  connect(
    mapStateToProps,
    { authCheckState, logout, cleanNotification }
  )(AppRouted)
);
