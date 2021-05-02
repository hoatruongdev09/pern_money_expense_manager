import { Fragment, useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Host from "./AppURL";

import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

import MainDashboard from "./components/Dashboard/MainDashboard";

function App() {
  const [isAuthenticate, setAuthenticate] = useState(false);

  const setAuth = (auth) => {
    setAuthenticate(auth);
  };

  async function isAuth() {
    try {
      const response = await fetch(`${Host}/auth`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.status !== 200) {
        setAuthenticate(false);
      } else {
        setAuthenticate(true);
      }
    } catch (error) {
      setAuthenticate(false);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);
  return (
    <Fragment>
      <Router>
        <Switch>
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
                <Dashboard
                  {...props}
                  Render={MainDashboard}
                  setAuth={setAuth}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
