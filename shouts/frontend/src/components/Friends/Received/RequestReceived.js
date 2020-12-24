import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import useStyles from "../UseStyle";

function RequestReceived(props) {
  const classes = useStyles();
  useEffect(() => {
    friendlistreceived();

    return () =>
      console.log("***************FriendRequestsReceivedList Unmounted");
  }, []);
  const pk = props.user.id;
  const friendlistreceived = () => {
    fetch(`/api/requestreceived/${pk}`)
      .then((res) => res.json())
      .then((data) =>
        props.dispatch({
          type: "DisplayRequestsReceived",
          payload: data,
        })
      );
  };

  const acceptRequest = (data) => {
    axios
      .patch(`/api/friendlist/${data.id}`, data)
      .then((res) => friendlistreceived())
      .catch((error) => console.log(error));
  };

  const rejectRequest = (data) => {
    axios
      .delete(`/api/friendlist/${data.id}`, data)
      .then((res) => friendlistreceived())
      .catch((error) => console.log(error));
  };

  console.log("***********", props.requestReceived);

  return (
    <div className={classes.root}>
      <Grid>
        {props.requestReceived.map((data, item) => {
          return (
            <Grid container spacing={3} key={item}>
              {/* Chnage the name=shubham dynamically using state */}
              {data.sender === props.user.username ? null : (
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <div className={classes.cardFlex}>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://picsum.photos/id/1000/200/300"
                        className={classes.large}
                      ></Avatar>
                      <Box m="auto" ml="1rem">
                        {data.sender}
                      </Box>
                      {/* <button type="button" onClick={() => acceptRequest(data)}>
                        Accept
                      </button> */}
                      <IconButton
                        aria-label="accept"
                        color="primary"
                        onClick={() => acceptRequest(data)}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => unfriendRequest(data)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </Paper>
                </Grid>
              )}
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

const mapStoreToProps = (state) => {
  return {
    requestReceived: state.requestReceived.requestReceived,
    user: state.friendList.user,
  };
};

export default connect(mapStoreToProps)(RequestReceived);
