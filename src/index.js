import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { ConnectedRouter } from "connected-react-router";
import MainRouter from "./containers/MainRouter";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/authReducer";
import usersReducer from "./store/reducers/usersReducer";
import notificationsReducer from "./store/reducers/notificationsReducer";
import pollsReducer from "./store/reducers/pollsReducer";
import pollstersReducer from "./store/reducers/pollstersReducer";
import citiesReducer from "./store/reducers/citiesReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createBrowserHistory();

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  notifications: notificationsReducer,
  polls: pollsReducer,
  pollsters: pollstersReducer,
  cities: citiesReducer
});

const store = createStore(
  connectRouter(history)(rootReducer), // new root reducer with router state
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      thunk // for dispatching history actions
      // ... other middlewares ...
    )
  )
);

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MainRouter />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
// registerServiceWorker();
