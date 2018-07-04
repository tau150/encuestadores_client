import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./containers/Login";
import Home from "./components/Home";
import Test from "./components/Test";
import { authCheckState, logout } from "./store/actions/authActions";
import LayoutSimple from "./components/LayoutSimple";
// import Layout from "./hoc/Layout";
// import UsersIndex from "./containers/UsersIndex";

import Notifications, { notify } from "react-notify-toast";

class App extends Component {
  componentWillMount() {
    this.props.authCheckState();
  }

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    let routes;

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
          {/* <Route path="/users" component={usersIndex} /> */}
          <Route path="/" exact component={Home} />
          <Route path="/usuarios" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/test" component={test} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      );
    }

    let layout = this.props.isAuthenticated ? (
      <LayoutSimple
        userName={localStorage.getItem("userEmail")}
        logout={this.handleLogout}
      >
        {routes}
      </LayoutSimple>
    ) : (
      <div>{routes}</div>
    );

    return (
      <div>
        <Notifications options={{ zIndex: 200 }} />
        {layout}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    user: state.auth.user
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { authCheckState, logout }
  )(App)
);
