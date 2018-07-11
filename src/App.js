import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Notifications from "react-notify-toast";
import { notify } from "react-notify-toast";
import Login from "./containers/Login";
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

class App extends Component {
  componentDidMount() {
    if (this.props.message) {
      notify.show(this.props.message, "success", 2000);
    }
    console.log(this.props);
    this.props.authCheckState();
  }

  componenDidUpdate() {
    this.props.authCheckState();
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

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    let routes;
    let layout;

    if (!this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path="/login" component={Login} />
          <Redirect to="/login" />
        </Switch>
      );

      layout = null;
    } else if (this.props.isAuthenticated && this.props.user.role_id === 1) {
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

    layout = this.props.isAuthenticated ? (
      <LayoutSimple
        userName={localStorage.getItem("userEmail")}
        logout={this.handleLogout}
        role={this.props.user.role_id}
      >
        {routes}
      </LayoutSimple>
    ) : (
      <div>{routes}</div>
    );

    return (
      <div>
        <Loading open={this.props.loading} />
        <Notifications options={{ zIndex: 200 }} />
        {layout}
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
  )(App)
);
