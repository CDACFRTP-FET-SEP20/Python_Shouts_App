import { Avatar, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { connect } from "react-redux";
const useStyles = makeStyles({
  shout: {
    width: "100%",
    marginTop: "15px",
    borderRadius: "15px",
    backgroundColor: "white",
    boxShadow: "0px 5px 7px -7px rgba(0,0,0,0.75)",
  },
  shout_top: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    padding: "15px",
  },
  shout__media: {
    "& img": {
      width: "100%",
    },
  },
  shout__avatar: {
    marginRight: "10px",
  },
  shout__topInfo: {
    fontSize: "medium",
    "& p": {
      fontSize: "small",
      color: "gray",
    },
    "& h3": {
      fontSize: "medium",
    },
  },
  shout__bottom: {
    marginTop: "10px",
    marginBottom: "10px",
    padding: "15px 25px",
  },
  shout__options: {
    paddingTop: "10px",
    borderTop: "1px solid lightgray",
    display: "flex",
    justifyContent: "space-evenly",
    fontSize: "medium",
    color: "gray",
    cursor: "pointer",
    padding: "15px",
  },
  shout__option: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
    flex: 1,
    "& p": {
      marginLeft: "10px",
    },
    "&:hover": {
      backgroundColor: "#eff2f5",
      borderRadius: "10px",
    },
  },
});
function Shout({ profilePic, image, username, timestamp, message }) {
  const classes = useStyles();
  // useEffect(() => {
  //   if (props.shouts.length === 0) {
  //     fetch("/api/posts/")
  //       .then((resp) => resp.json())
  //       .then((data) =>
  //         props.dispatch({
  //           type: "setShouts",
  //           payload: data,
  //         })
  //       );
  //   }
  // }, []);
  return (
    <div className={classes.shout}>
      <div className={classes.shout_top}>
        <Avatar className={classes.shout__avatar} src={profilePic} />
        <div className={classes.shout__topInfo}>
          <h3>{username}</h3>
          <p>Time...</p>
        </div>
      </div>

      <div className={classes.shout__bottom}>
        <p>{message}</p>
      </div>
      <div className={classes.shout__media}>
        <img src={image} alt="" />
      </div>
      <div className={classes.shout__options}>
        <div className={classes.shout__option}>
          <ThumbUpIcon />
          <p>Like</p>
        </div>
        <div className={classes.shout__option}>
          <ChatBubbleIcon />
          <p>Comment</p>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  shouts: state.shouts,
});
export default connect(mapStateToProps)(Shout);
