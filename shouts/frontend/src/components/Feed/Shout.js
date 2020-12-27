import { Avatar, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";
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
function Shout({ shouts }) {
  const classes = useStyles();

  return (
    <div className={classes.shout}>
      <div className={classes.shout_top}>
        <Avatar className={classes.shout__avatar} src="" />
        <div className={classes.shout__topInfo}>
          <h3>{shouts.username}</h3>
          <p>{shouts.date_posted}</p>
        </div>
      </div>

      <div className={classes.shout__bottom}>
        <p>{shouts.title}</p>
        <p>{shouts.description}</p>
      </div>
      {/* ====================Video========================== */}
      {shouts.post_type === "V" ? (
        <div>
          <ReactPlayer
            width="100%"
            height="100%"
            url={shouts.media}
            playing={true}
            controls={true}
            light={false}
            loop={true}
            volume={0}
            muted={false}
          />
        </div>
      ) : null}
      {/* ====================Audio========================== */}
      {shouts.post_type === "A" ? (
        <ReactAudioPlayer src={shouts.media} controls />
      ) : null}
      {/* ====================Image========================== */}
      {shouts.post_type === "I" ? (
        <div className={classes.shout__media}>
          <img src={shouts.media} alt="" />
        </div>
      ) : null}

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

export default Shout;
