import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import useStyles from "../UseStyles";

function RequestSent(props) {
  const classes = useStyles();
  useEffect(() => {
    newfrienddata();

    return () => console.log("***************sent request Unmounted");
  }, []);
  const pk = props.user.id;
  const newfrienddata = () => {
    fetch(`/api/requestsent/${pk}`)
      .then((res) => res.json())
      .then((data) =>
        props.dispatch({
          type: "DisplayRequestsSent",
          payload: data,
        })
      );
  };

  console.log("***********", props.user);

  const sendRequest = (receiver) => {
    console.log("Sender=====", props.user);
    console.log("receiver=====", receiver);

    const data1 = {
      receiver: receiver,
    };

    axios
      .post(`/api/friendlist/${pk}`, data1)
      .then((res) => newfrienddata())
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.root}>
      <Grid>
        {props.requestSent.map((data, item) => {
          return (
            <Grid container spacing={3} key={item}>
              {/* Chnage the name=shubham dynamically using state */}
              {data.username === props.user.username ? null : (
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <div className={classes.cardFlex}>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://picsum.photos/id/1000/200/300"
                        className={classes.large}
                      ></Avatar>
                      <Box m="auto" ml="1rem">
                        {data.username.toUpperCase()}
                      </Box>
                      <IconButton
                        aria-label="accept"
                        color="primary"
                        onClick={() => sendRequest(data)}
                      >
                        <AddCircleIcon />
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
    requestSent: state.requestSent.requestSent,
    user: state.friendList.user,
  };
};

export default connect(mapStoreToProps)(RequestSent);
