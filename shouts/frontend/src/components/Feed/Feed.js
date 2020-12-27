import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import CreateShout from "./CreateShout";
import Shout from "./Shout";
import Text from "./Text";
import { connect } from "react-redux";
const useStyles = makeStyles({
  feed: {
    flex: 1,
    padding: "30px 150px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
function Feed(props) {
  const classes = useStyles();
  const [shouts, setShouts] = useState([]);
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
    <div className={classes.feed}>
      <CreateShout />
      {props.shouts.map((shout) => (
        <Shout key={shout.post_id} shouts={shout} />
      ))}
    </div>
  );
}
const mapStateToProps = (state) => ({
  shouts: state.shouts,
});
export default connect(mapStateToProps)(Feed);
