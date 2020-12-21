import React, { Component } from "react";
import { render } from "react-dom";
import CreateShout from './CreateShout'
import GetShouts from "./GetShouts";
class App extends Component {
  render() {
    return (
      <>
      <h1>Hi</h1>
      <CreateShout/>
      <GetShouts/>
      </>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
