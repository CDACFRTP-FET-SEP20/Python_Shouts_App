import React, { useEffect, useRef, useState } from "react";
import Cards from "../Card";
import { connect } from "react-redux";
import axios from "axios";
function MyShouts(props) {
  var user_id = "21972bf4-f2c5-4658-b08a-6378034f8ee1";
  useEffect(() => {
    if (props.shouts.length === 0) {
      fetch("/api/mypostlist/" + user_id + "/")
        .then((resp) => resp.json())
        .then((data) =>
          props.dispatch({
            type: "setShouts",
            payload: data,
          })
        );
    }
  }, []);

  return (
    <div>
      {props.shouts.map((shout) => (
        <Cards key={shout.post_id} shouts={shout} delete={true} />
      ))}
    </div>
  );
}
const mapStateToProps = (state) => ({
  shouts: state.shouts,
});
export default connect(mapStateToProps)(MyShouts);
