import React, { Component } from "react";
import { render } from "react-dom";
import Login from "./login";
import Register from "./register";
import UpdateProfile from "./updateProfile";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store from "../store/store";
import { Provider } from "react-redux";

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter basename="/app">
            <div>
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/updateProfile" component={UpdateProfile} />
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
