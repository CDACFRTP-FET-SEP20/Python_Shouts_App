import React, { Component } from "react";
import { render } from "react-dom";
import CreateShout from "./Shouts/CreateShout";
import GetShouts from "./Shouts/GetShouts";
import store from "./RootReducer/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename="/app">
        <Link to="/shouts">Get Shouts</Link><br/>
        <Link to="/create-shouts">Create Shouts</Link>
          <Switch>
            <Route path="/shouts">
              <GetShouts />
            </Route>
          </Switch>
          <Switch>
            <Route path="/create-shouts">
              <CreateShout />
            </Route>
          </Switch>
        </BrowserRouter>
        <h1>Hi</h1>
      </Provider>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
