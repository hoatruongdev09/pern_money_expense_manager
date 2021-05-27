import { Fragment, useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  BrowserRouter,
} from "react-router-dom";

import Host from "./AppURL";


import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import TransPage from "./components/Trans";
import CategoryManager from "./components/CategoryManager"
import UserProfile from "./components/UserProfile"
import Home from "./components/Home";

function App() {
  const [isAuthenticate, setAuthenticate] = useState(false);
  const [isWaitingAuth, setWaitingAuth] = useState(true);

  const [authLink, setAuthLink] = useState("");

  const setAuth = (auth) => {
    setAuthenticate(auth);
    console.log(window.location);
  };

  const delayToStopWaiting = (time) => {
    setTimeout(() => {
      setWaitingAuth(false);
    }, time);
  };

  async function isAuth() {
    try {
      setWaitingAuth(true);
      let response = await fetch(`${Host}/auth`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.status != 200) {
        delayToStopWaiting(500);
        setAuth(false);
        return
      }
      setAuth(true);
      delayToStopWaiting(500);
    } catch (error) {
      console.log(error);
      setAuth(false);
      delayToStopWaiting(500);
    }
  }


  const logOut = (e) => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  useEffect(() => {
    isAuth();
  }, []);
  if (isWaitingAuth) {
    return (
      <Fragment>
        <div>Waiting</div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/home">
              <Home />
            </Route>

            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticate ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticate ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect {...props} to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthenticate ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/dashboard/transaction"
              render={(props) =>
                isAuthenticate ? (
                  <TransPage {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/dashboard/categories"
              render={
                (props) => isAuthenticate ? (<CategoryManager {...props} setAuth={setAuth} />)
                  : (<Redirect to="/login" />)
              }
            />
            <Route
              exact
              path="/dashboard/userprofile"
              render={
                (props) => isAuthenticate ? (<UserProfile {...props} setAuth={setAuth} />) :
                  (<Redirect to="/login" />)
              }
            />
          </Switch>
        </BrowserRouter>
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>

        <div
          className="modal fade"
          id="logoutModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Confirm logout
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Do you really want to logout ?
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={(e) => logOut(e)}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
