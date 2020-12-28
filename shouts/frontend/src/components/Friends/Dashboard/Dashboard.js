import React, { useEffect, useState } from "react";
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
  searchField,
} from "../../Services/FriendService";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

function Dashboard(props) {
  const classes = useStyle();

  const [searchState, setsearchState] = useState("friend");

  const changeSearchState = (e) => {
    console.log(searchState);
    setsearchState(e);
  };

  const links = {
    color: "A500",
    marginBottom: "1rem",
    textDecoration: "none",
  };

  const stringArray = props.friendList.map((item) =>
    props.user.username != item.receiver ? item.receiver : item.sender
  );

  console.log(props.friendList);

  console.log("---------", stringArray);

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

      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={stringArray.map((option) => option)}
        onChange={(event, value) => searchField(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: "search" }}
            color="secondary"
          />
        )}
      />

      <Link
        to="/friendlist"
        style={links}
        onClick={() => changeSearchState("friend")}
      >
        <Paper className={classes.paper}>
          Friends({props.friendList.length})
        </Paper>
      </Link>

      <Link
        to="/requestsent"
        style={links}
        onClick={() => changeSearchState("requestsent")}
      >
        <Paper className={classes.paper}>Search Friends</Paper>
      </Link>

      <Link
        to="/requestreceived"
        style={links}
        onClick={() => changeSearchState("requestreceived")}
      >
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
