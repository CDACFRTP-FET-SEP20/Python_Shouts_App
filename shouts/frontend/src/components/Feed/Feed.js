import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
// import CreateShout from "./CreateShout";
import Shout from "./Shout";
import Shoutyy from "./Shoutyy";
import CreateShouts from "./CreateShouts";
import { connect } from "react-redux";
import { getPosts } from "../../actions/PostActions";
import { profiledata } from "../Services/FriendService";
import { Grid, Paper } from "@material-ui/core";
import Navbar from "../Header/Navbar";
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
    <>
      <Navbar />

      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center
      "
      >
        <CreateShouts />
      </Grid>
      <Grid item sm>
        <Paper>
          {/*==============Create Shouts====================== */}

          {/*==============Display Shouts====================== */}
          {props.shouts.map((shout) => (
            // <Shout key={shout.post_id} shouts={shout} />
            <Shoutyy key={shout.post_id} shouts={shout} myshouts={false} />
          ))}
        </Paper>
      </Grid>
    </>
  );
}
const mapStateToProps = (state) => ({
  shouts: state.shouts,
  user: state.login,
  profiles: state.friendList.profiles,
});
export default connect(mapStateToProps)(Feed);
