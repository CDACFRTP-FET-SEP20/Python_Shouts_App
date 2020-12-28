import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import useStyles from "../UseStyles";
import { friendlistdata } from "../../Services/FriendService";

function FriendList(props) {
  const classes = useStyles();
  // useEffect(() => {
  //   friendlistdata(props);

  //   return () => console.log("***************FriendList Unmounted");
  // }, []);

  // const friendlistdata = () => {
  //   const pk = props.user.id;
  //   axios.get(`/api/friendlist/${pk}`).then((res) =>
  //     props.dispatch({
  //       type: "DisplayList",
  //       payload: res.data,
  //     })
  //   );
  // };

  const unfriendRequest = (data) => {
    axios
      .patch(`/api/friendlist/${data.id}`, data)
      .then((res) => friendlistdata(props))
      .catch((error) => console.log(error));
  };

  // console.log("***********", props);

  return (
    <div className={classes.root}>
      <Grid>
        {props.friendList.map((data, item) => {
          return (
            <Grid container spacing={3} key={item}>
              {/* Chnage the name=shubham dynamically using state */}
              {data.receiver === props.user.username ? (
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <div className={classes.cardFlex}>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://picsum.photos/id/1000/200/300"
                        className={classes.large}
                      ></Avatar>
                      <Box m="auto" ml="1rem">
                        {data.sender.toUpperCase()}
                      </Box>
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => unfriendRequest(data)}
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                    </div>
                  </Paper>
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <div className={classes.cardFlex}>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://picsum.photos/id/1000/200/300"
                        className={classes.large}
                      ></Avatar>
                      <Box m="auto" ml="1rem">
                        {data.receiver.toUpperCase()}
                      </Box>
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => unfriendRequest(data)}
                      >
                        <RemoveCircleIcon />
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
    friendList: state.friendList.friendList,
    user: state.friendList.user,
  };
};

export default connect(mapStoreToProps)(FriendList);
