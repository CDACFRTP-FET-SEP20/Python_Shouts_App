import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
// import CreateShout from "./CreateShout";
import Shout from "./Shout";
import Shoutyy from "./Shoutyy";
import CreateShouts from "./CreateShouts";
import { connect } from "react-redux";
import { getPosts } from "../../actions/PostActions";
import { profiledata, friendlistdata } from "../Services/FriendService";
import { Grid, Paper } from "@material-ui/core";
import Navbar from "../Header/Navbar";
import { getReports } from "../Services/ReportService";

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
  },
  feedBackground: {
    backgroundColor: "#f1f5f2",
  },
});
function Feed(props) {
  const classes = useStyles();

  useEffect(() => {
    profiledata(props);
    friendlistdata(props);

    // ==============Get Shouts======================
    getPosts(props);
    getReports(props);
  }, []);

  console.log("*****feed*********", props);

  const filteredArray = [];
  function filteredFeed() {
    for (let shout of props.shouts) {
      if (shout.username === props.user.username) {
        console.log("user.username");
        filteredArray.push(shout);
      }
      for (let friend of props.friendList) {
        if (
          shout.username === friend.sender &&
          friend.sender !== props.user.username
        ) {
          console.log("sender");
          filteredArray.push(shout);
        }
        if (
          shout.username === friend.receiver &&
          friend.receiver !== props.user.username
        ) {
          console.log("receiver");
          filteredArray.push(shout);
        }
      }
    }
  }
  filteredFeed();
  console.log("Filter array==", filteredArray);

  return (
    <>
      <Navbar />

      <Grid
        container
        spacing={2}
        alignItems="center"
        justifycontent="center"
        className={classes.feedBackground}
      >
        {/*==============Create Shouts====================== */}

        <CreateShouts />
      </Grid>
      <Grid item sm className={classes.feedBackground}>
        <Paper className={classes.feedBackground}>
          {/*==============Display Shouts====================== */}
          {filteredArray.map((shout) => (
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
  friendList: state.friendList.friendList,
  reports: state.report.report,
});
export default connect(mapStateToProps)(Feed);
