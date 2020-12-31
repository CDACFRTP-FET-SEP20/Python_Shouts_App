import React, { useEffect, useRef, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Container, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import axios from "axios";
import Shout from "./Shout";
import CreateShouts from "./CreateShouts";
import { getMyPost } from "../../actions/PostActions";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // feed: {
  //   flex: 1,
  //   padding: "30px 200px",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#f1f2f5",
  //   "@media (max-width: 900px)": {
      
  //     padding: "10px 50px",
  //   },
  // },
  paper_grid: {
    padding: theme.spacing(2),
    textAlign: "left",
    backgroundColor: "#f1f2f5",
    // borderRadius: "15px",
  },
  feed: {
    flex: 1,
    padding: "30px 150px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f2f5",
  },
}));
function MyShouts(props) {
  const classes = useStyles();
  var user_id = props.user.user_id;
  console.log("myshouts",props.user.user_id);
  useEffect(() => {
    console.log("myshouts");
    // ==============Get Shouts======================
    getMyPost(props, user_id);
  }, []);

  return (
    <>
      <div className={classes.feed}>
      {/* ==============Create Shouts====================== */}
        <CreateShouts />
      {/* ==============Display Shouts====================== */}
        {props.shouts.map((shout) => (
          <Shout key={shout.post_id} shouts={shout} />
        ))}
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  shouts: state.shouts,
  user: state.login,
});
export default connect(mapStateToProps)(MyShouts);
