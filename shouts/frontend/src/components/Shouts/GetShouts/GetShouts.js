import React, { useEffect, useRef, useState } from "react";

import Cards from "../Card";

import { connect } from "react-redux";
function GetShouts(props) {
  useEffect(() => {
    if (props.shouts.length === 0) {
      fetch("/api/posts/")
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
        <Cards key={shout.post_id} shouts={shout} delete={false}/>
      ))}
    </div>
  );
}
const mapStateToProps = (state) => ({
  shouts: state.shouts,
});
export default connect(mapStateToProps)(GetShouts);
