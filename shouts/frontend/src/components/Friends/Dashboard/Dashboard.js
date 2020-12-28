import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import useStyle from "../UseStyles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import {
  friendlistreceived,
  friendlistdata,
} from "../../Services/FriendService";

function Dashboard(props) {
  const classes = useStyle();
  const links = {
    color: "A500",
    marginBottom: "1rem",
    textDecoration: "none",
  };

  useEffect(() => {
    friendlistreceived(props);
    friendlistdata(props);

    return () => console.log("*****Dashboard*********");
  }, []);

  return (
    <div className={classes.cardDashboard}>
      <Avatar
        alt="Remy Sharp"
        src="https://picsum.photos/id/1000/200/300"
        className={classes.extraLarge}
      />
      <Box style={{ color: "white" }} fontSize={24} mt={2} mb={1}>
        {props.user.username.toUpperCase()}
      </Box>
      <Box style={{ color: "#f3e5f5" }} fontSize={16} mb={5}>
        {props.user.bio}
      </Box>

      <Link to="/friendlist" style={links}>
        <Paper className={classes.paper}>
          Friends({props.friendList.length})
        </Paper>
      </Link>

      <Link to="/requestsent" style={links}>
        <Paper className={classes.paper}>Search Friends</Paper>
      </Link>

      <Link to="/requestreceived" style={links}>
        <Paper className={classes.paper}>
          Friend Requests({props.requestReceived.length})
        </Paper>
      </Link>
    </div>
  );
}

const mapStoreToProps = (state) => {
  return {
    friendList: state.friendList.friendList,
    requestSent: state.requestSent.requestSent,
    user: state.friendList.user,
    requestReceived: state.requestReceived.requestReceived,
  };
};

export default connect(mapStoreToProps)(Dashboard);
