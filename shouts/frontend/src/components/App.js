import React, { Component } from "react";
import { render } from "react-dom";
import Login from "./login";
import Register from "./register";
import MyShouts from "./Feed/MyShouts";
import Header1 from "./Header/Header1";
import UpdateProfile from "./updateProfile";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import store from "../store/store";
import { Provider } from "react-redux";
import Friends from "./Friends/Friends";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import Feed from "./Feed/Feed";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./Header/Navbar";

const useStyles = makeStyles({
  App: {
    backgroundColor: "#f1f2f5",
  },
  app__body: {
    // display: "flex",
    backgroundColor: "#f1f2f5",
  },
});
function App() {
  const classes = useStyles();

  return (
    <div className={classes.app__body}>
      <h1 >Head</h1>
      <Provider store={store}>
        <BrowserRouter basename="/app">
          {/* <Grid item sm>
              <Paper>
                <Navbar />
              </Paper>
            </Grid> */}

          <Switch>
            <PrivateRoute exact path="/" component={Feed} />

            <PrivateRoute path="/mypost" component={MyShouts} />
            {/* <Route path="/mypost" component={MyShouts} /> */}
            <PrivateRoute path="/dashboard" component={Friends} />
            <PrivateRoute path="/updateProfile" component={UpdateProfile} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            {/* <Route path="/" component={Feed} /> */}
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
