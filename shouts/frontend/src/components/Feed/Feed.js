import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
// import CreateShout from "./CreateShout";
import Shout from "./Shout";
import CreateShouts from "./CreateShouts";
import { connect } from "react-redux";
import { getPosts } from "../../actions/PostActions";
import { profiledata } from "../Services/FriendService";
const useStyles = makeStyles({
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
  feed: {
    flex: 1,
    padding: "30px 150px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f2f5",
  },
});
function Feed(props) {
  const classes = useStyles();

  useEffect(() => {
    profiledata(props);
    // ==============Get Shouts======================
    getPosts(props);
  }, []);

  console.log("*****feed*********", props.profiles);

  return (
    <div className={classes.feed}>
      {/*==============Create Shouts====================== */}
      <CreateShouts />
      {/*==============Display Shouts====================== */}
      {props.shouts.map((shout) => (
        <Shout key={shout.post_id} shouts={shout} />
      ))}
    </div>
  );
}
const mapStateToProps = (state) => ({
  shouts: state.shouts,
  user: state.login,
  profiles: state.friendList.profiles,
});
export default connect(mapStateToProps)(Feed);
