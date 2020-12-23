import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import FriendList from "./FriendList/FriendList";
import RequestSent from "./Sent/RequestSent";
import RequestReceived from "./Received/RequestReceived";

const Friends = () => {
  return (
    <div>
      <h1>Welcome to Friend Page</h1>
      <Link to="/app/friendlist">My Friend List</Link>&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/app/requestsent">Make New Friends</Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/app/requestreceived">New Friend Requests Received</Link>
      <Switch>
        <Route path="/app/friendlist">
          <FriendList />
        </Route>
        <Route path="/app/requestsent">
          <RequestSent />
        </Route>
        <Route path="/app/requestreceived">
          <RequestReceived />
        </Route>
      </Switch>
    </div>
  );
};

export default Friends;
