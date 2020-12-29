import React, { Component, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Like from './Comment_Like_Report/Like'
import store from '../store/store'

class App extends Component {
  
  render() {
    return (
      <>
      <Provider store={store}>
      <BrowserRouter basename="/app">
      <h1>Hi</h1>
      <Like />
      <Switch>
        <Route path="/comment" component={Comment} />
        <Route path="/like" component={Like} />
      </Switch>
      </BrowserRouter>
      </Provider>
      </>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
