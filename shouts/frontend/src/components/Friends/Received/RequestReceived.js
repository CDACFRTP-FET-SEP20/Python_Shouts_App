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
import useStyles from "../UseStyles";
import {
  friendlistreceived,
  friendlistdata,
  newfrienddata,
} from "../../Services/FriendService";
import Search from "../Dashboard/Search";

function RequestReceived(props) {
  
  const classes = useStyles();
  const authToken = props.user.token;

  const acceptRequest = (data) => {
    axios
      .patch(`/api/friendlist/${data.user_id}`, data,{headers: {
        Authorization: `Token ${authToken}`,
      },
    })
      .then((res) => {
        friendlistreceived(props);
        friendlistdata(props);
      })
      .catch((error) => console.log(error));
  };

  const rejectRequest = (data) => {
    console.log("data--------", data);
    console.log("req",props.user);
    axios
      .delete(`/api/friendlist/${data.id}`, data,{headers: {
        Authorization: `Token ${authToken}`,
      },
    })
      .then((res) => {
        friendlistreceived(props);
        newfrienddata(props);
      })
      .catch((error) => console.log(error));
  };

  console.log("profiles==", props.profiles);
  console.log("****requestReceived*******", props.requestReceived);

  const searchedArray = props.requestReceived.filter((item) => {
    console.log("user--", item.sender);
    if (props.user.username === item.receiver) {
      return item?.sender.toLowerCase().includes(props.search.toLowerCase());
    } else
      return item?.receiver.toLowerCase().includes(props.search.toLowerCase());
  });

  return (
    <div className={classes.root}>
      <Search />
      <Grid>
        {searchedArray.map((data, item) => {
          return (
            <Grid container spacing={3} key={item}>
              {/* Chnage the name=shubham dynamically using state */}
              {
                // data.sender === props.user.username ? null : (
                <Grid item xs={12} className="media-500">
                  <Paper className={classes.paper}>
                    <div className={classes.cardFlex}>
                      <Avatar
                        alt="Remy Sharp"
                        src={props.profiles.forEach((item1) =>
                          item1.username === data.sender
                            ? console.log(item1.user_image)
                            : null
                        )}
                        className={classes.large}
                      ></Avatar>

                      <Box m="auto" ml="1rem">
                        {data.sender.toUpperCase()}
                      </Box>
                      <IconButton
                        aria-label="accept"
                        // color="primary"
                        style={{ color: "green" }}
                        onClick={() => acceptRequest(data)}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => rejectRequest(data)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </Paper>
                </Grid>
                // )
              }
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
    user: state.login,
    search: state.search.search,
    profiles: state.friendList.profiles,
  };
};

export default connect(mapStoreToProps)(RequestReceived);
