import { Avatar, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  shout: {
    width: "100%",
    marginTop: "15px",
    borderRadius: "15px",
    backgroundColor: "white",
    boxShadow: "0px 5px 7px -7px rgba(0,0,0,0.75)",
    width: "76%",
    "@media (max-width: 900px)": {
      width: "78%",
    },
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
    "@media (max-width: 900px)": {
      width: "78%",
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
  editButtons: {
    position: "absolute",
    left: "300px",
    "@media (max-width: 900px)": {
      position: "absolute",
      left: "2px",
    },
  },
  deleteButtons: {
    position: "absolute",
    right: "10px",
  },
  paper_grid: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    borderRadius: "15px",
  },
  reactAudioPlayer: {
    width: "100%",
  },
}));
function Shout(props) {
  console.log("Shouts==", props);
  const username = sessionStorage.getItem("user");
  const [myshout, setMyShout] = useState(props.myshout);
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postId, setPostId] = useState("");
  const [postContent, setPostContent] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  // ===========================Menu================================
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setEditModalOpen(false);
  };
  // ===========================Delete================================
  const onDeletePost = (postTitle, postId) => {
    console.log("delete");
    setModalOpen(true);
    setPostTitle(postTitle);
    setPostId(postId);
  };
  // ===========================Edit================================
  const onEditePost = (postContent, postTitle, postId) => {
    setEditModalOpen(true);
    setPostContent(postContent);
    setPostTitle(postTitle);
    setPostId(postId);
  };
  const profilepic = (data) => {
    for (let item1 of props.profiles) {
      if (item1.username === data.username) {
        return item1.user_image.slice(21);
      }
    }
  };

  return (
    <div className={classes.shout}>
      {/* {props.shouts.title} */}
      <div className={classes.shout_top}>
        <Avatar
          className={classes.shout__avatar}
          src={profilepic(props.shouts)}
        />

        <div className={classes.shout__topInfo}>
          <h3>{props.shouts.username}</h3>
          <p>{props.shouts.date_posted}</p>
        </div>
        {props.shouts.username === username ? (
          <div>
            <div className={classes.shout_top}>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className={classes.editButtons}
              >
                <MoreVertIcon />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={(e) => {
                    handleClose();
                    onEditePost(postContent, postTitle, postId);
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    handleClose();
                    onDeletePost(postTitle, postId);
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </div>
          </div>
        ) : null}
      </div>

      <div className={classes.shout__bottom}>
        <p>{props.shouts.title}</p>
        <p>{props.shouts.description}</p>
      </div>
      {/* ====================Video========================== */}
      {props.shouts.post_type === "V" ? (
        <div>
          <ReactPlayer
            width="100%"
            height="100%"
            url={props.shouts.media}
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
      {props.shouts.post_type === "A" ? (
        <div className={classes.audio}>
          <ReactAudioPlayer
            src={props.shouts.media}
            controls
            style={{ width: "100%" }}
          />
        </div>
      ) : null}
      {/* ====================Image========================== */}
      {props.shouts.post_type === "I" ? (
        <div className={classes.shout__media}>
          <img src={props.shouts.media} alt="" />
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
      <DeleteModal
        open={modalOpen}
        handleClose={handleModalClose}
        postTitle={props.shouts.title}
        postId={props.shouts.post_id}
        myshout={props.myshouts}
      />
      <EditModal
        open={editModalOpen}
        handleClose={handleModalClose}
        postTitle={props.shouts.title}
        postContent={props.shouts.description}
        postId={props.shouts.post_id}
        media={props.shouts.media}
        post_type={props.shouts.post_type}
      />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.login,
    profiles: state.friendList.profiles,
  };
};
export default connect(mapStateToProps)(Shout);
