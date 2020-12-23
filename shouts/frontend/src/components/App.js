import React, { Component } from "react";
import { render } from "react-dom";
import store from "./RootRedux/Store";
import { Provider } from "react-redux";
import Friends from "./Friends/Friends";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hi</h1>
        <Provider store={store}>
          <BrowserRouter>
            <Friends></Friends>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
