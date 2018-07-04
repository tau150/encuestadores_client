import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./containers/Login";
import Home from "./components/Home";
import Test from "./components/Test";
import { authCheckState } from "./store/actions/authActions";
import Layout from "./hoc/Layout";
// import UsersIndex from "./containers/UsersIndex";
import Notifications, { notify } from "react-notify-toast";

class App extends Component {
  componentWillMount() {
    this.props.authCheckState();
  }

  render() {
    let routes;

    const home = Layout(Home);

    const test = Layout(Test);
    // const usersIndex = Layout(UsersIndex);

    if (!this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path="/login" component={Login} />
          <Redirect to="/login" />
        </Switch>
      );
    } else if (this.props.isAuthenticated && this.props.user.role_id === 1) {
      routes = (
        <Switch>
          {/* <Route path="/users" component={usersIndex} /> */}
          <Route path="/" exact component={home} />
          <Redirect to="/" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/test" component={test} />
          <Route path="/" exact component={home} />
          <Redirect to="/" />
        </Switch>
      );
    }

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
    user: state.auth.user
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { authCheckState }
  )(App)
);
