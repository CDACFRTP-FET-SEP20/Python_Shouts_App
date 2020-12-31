import React, { Component } from "react";
import { render } from "react-dom";
import Login from "./login";
import Register from "./register";
import MyShouts from "./Feed/MyShouts";
import Header1 from './Header/Header1'
import UpdateProfile from "./updateProfile";
import { BrowserRouter, Switch, Route,Link } from "react-router-dom";
import store from "../store/store";
import { Provider } from "react-redux";
import Friends from "./Friends/Friends";
import { makeStyles } from "@material-ui/core";
import Feed from "./Feed/Feed";

const useStyles = makeStyles({
  App: {
    backgroundColor: "#f1f2f5",
  },
  app__body: {
    display: "flex",
    backgroundColor: "#f1f2f5",
  },
});
function App () {
  const classes = useStyles();
  
  
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter basename="/app">
          <div className={classes.App}>
          {/* <Header /> */}
      <Header1/>
      
          <div className={classes.app__body}>
            {/* <SideBar /> */}
            <Switch>
              <Route exact path="/">
                <Feed />
              </Route>
            </Switch>
            <Switch>
              <Route path="/mypost">
                <MyShouts />
              </Route>
            </Switch>
          </div>
        </div>
            <div>
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={Friends} />
                <Route path="/updateProfile" component={UpdateProfile} />
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
      </div>
    );
  
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
