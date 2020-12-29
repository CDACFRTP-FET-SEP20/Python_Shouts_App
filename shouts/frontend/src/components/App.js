import React, { Component, useState } from "react";
import { render } from "react-dom";

import store from "./RootReducer/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import MyShouts from "./Feed/MyShouts";
import Header1 from './Header/Header1'
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
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
function App() {
  const classes = useStyles();
 
  return (
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
      </BrowserRouter>
    </Provider>
  );
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
