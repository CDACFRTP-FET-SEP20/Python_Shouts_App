import { Avatar, Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import VideocamIcon from "@material-ui/icons/Videocam";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Cookies from "js-cookie";
import dateFormat from "dateformat";
import axios from "axios";
import { connect } from "react-redux";
import {createPost} from '../../actions/PostActions'
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
const useStyles = makeStyles((theme) => ({
  create__card: {
    display: "flex",
    marginTop: "30px",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "0px 5px 7px -7px rgba(0,0,0,0.75)",
    width: "100%",
  },
  create__top: {
    display: "flex",
    borderBottom: "1px solid #eff2f5",
    padding: "15px",
    justifyContent: "flex-start",

    "& form": {
      flex: 1,
      display: "flex",
      justifyContent: "flex-start",
      "& input": {
        outlineWidth: 0,
        border: "none",
        padding: "5px 20px",
        margin: "0 10px",
        borderRadius: "999px",
        backgroundColor: "#eff2f5",
        width: "100%",
      },
    },
  },
  create__bottom: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  create__option: {
    padding: "20px",
    display: "flex",
    alignItems: "center",
    color: "gray",
    margin: "5px",
    "& h3": {
      fontSize: "medium",
      marginLeft: "10px",
    },
    "&:hover": {
      backgroundColor: "#eff2f5",
      cursor: "pointer",
    },
  },
  textModalContainer: {
    width: "500px",
    position: "relative",
    display: "flex",
    height: "300px",
    flexDirection: "column",
  },
  textmodalHeading: {
    display: "flex",
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center",
    height: "60px",
    borderBottom: "1px solid #eff2f5",
  },
  textmodaltextArea: {
    position: "absolute",
    top: "130px",
    height: "100px",
    width: "300px",
  },
  postButton: {
    backgroundColor: "blue",
    position: "absolute",
    top: "250px",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "15px",
    boxShadow: "0px 5px 7px -7px rgba(0,0,0,0.75)",

    padding: theme.spacing(2, 4, 3),
    outline: 0,
  },
}));
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
function CreateShout(props) {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [post_type, setPostType] = useState("T");
  const [modalStyle] = useState(getModalStyle);
  const [openText, setOpenText] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [openAudio, setOpenAudio] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const csrftoken = Cookies.get("csrftoken");

  var date = new Date();

  var post_date = dateFormat(date, "yyyy-mm-dd hh:mm");
  // ==========================Text Modal Controls======================================

  const handleOpen = () => {
    setOpenText(true);
  };
  const handleClose = () => {
    setOpenText(false);
  };
  // ==========================Video Modal Controls======================================
  const handleOpenVideo = () => {
    setOpenVideo(true);
  };
  const handleCloseVideo = () => {
    setOpenVideo(false);
  };
  // ==========================Audio Modal Controls======================================
  const handleOpenAudio = () => {
    setOpenAudio(true);
  };
  const handleCloseAudio = () => {
    setOpenAudio(false);
  };
  // ==========================Image Modal Controls======================================
  const handleOpenImage = () => {
    setOpenImage(true);
  };
  const handleCloseImage = () => {
    setOpenImage(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("post");

    const uploadData = new FormData();
    uploadData.append("title", title);
    uploadData.append("post_type", post_type);
    uploadData.append("description", description);
    uploadData.append("date_posted", post_date);
    uploadData.append("username", "21972bf4-f2c5-4658-b08a-6378034f8ee1");
    uploadData.append("media", media);
    createPost(props,uploadData);
    
    setOpenText(false);
    setOpenAudio(false);
    setOpenVideo(false);
    setOpenImage(false);
  };
  return (
    <div className={classes.create__card}>
      {/*=======================TextModal========================================  */}
      <Modal open={openText} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <div className={classes.textModalContainer}>
            {/* =============Heading=================== */}
            <div className={classes.textmodalHeading}>
              <h2>Create post</h2>
            </div>
            {/* ==============Title================== */}
            <div>
              <Avatar />

              <span>
                <p>Amy Santiago</p>
              </span>

              <form onSubmit={handleSubmit}>
                <TextField
                  required
                  label="Title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                  fullWidth={true}
                />
                {/* ==========Content=============== */}
                <TextField
                  required
                  name="description"
                  label="description"
                  multiline={true}
                  rowsMax="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  margin="normal"
                  fullWidth={true}
                />

                {/* ==================Post Button========== */}
                <div className={classes.postButton}>
                  <Button
                    type="submit"
                    onClick={() => {
                      setMedia("");
                    }}
                  >
                    Post
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      {/*=======================VideoModal========================================  */}
      <Modal open={openVideo} onClose={handleCloseVideo}>
        <div style={modalStyle} className={classes.paper}>
          <div className={classes.textModalContainer}>
            {/* =============Heading=================== */}
            <div className={classes.textmodalHeading}>
              <h2>Create post</h2>
            </div>
            {/* ==============Title================== */}
            <div className={classes.create__top}>
              <Avatar />
              <form onSubmit={handleSubmit}>
                <TextField
                  required
                  className={classes.create__input}
                  label="Title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                  fullWidth={true}
                />
                {/* ==========Upload Video=============== */}
                <div>
                  <span>Upload Video</span>
                  <input
                    accept="video/*"
                    type="file"
                    required
                    onChange={(e) => setMedia(e.target.files[0])}
                  />
                </div>
                {/* ==================Post Button========== */}
                <div className={classes.postButton}>
                  <Button
                    type="submit"
                    onClick={() => {
                      setPostType("V");
                      setDescription("");
                    }}
                  >
                    Post
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      {/*=======================AudioModal========================================  */}
      <Modal open={openAudio} onClose={handleCloseAudio}>
        <div style={modalStyle} className={classes.paper}>
          <div className={classes.textModalContainer}>
            {/* =============Heading=================== */}
            <div className={classes.textmodalHeading}>
              <h2>Create post</h2>
            </div>
            {/* ==============Title================== */}
            <div className={classes.create__top}>
              <Avatar />
              <form onSubmit={handleSubmit}>
                <TextField
                  required
                  className={classes.create__input}
                  label="Title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                  fullWidth={true}
                />
                {/* ==========Upload Audio=============== */}
                <div>
                  <span>Upload Audio</span>
                  <input
                    required
                    accept="audio/*"
                    type="file"
                    onChange={(e) => setMedia(e.target.files[0])}
                  />
                </div>
                {/* ==================Post Button========== */}
                <div className={classes.postButton}>
                  <Button
                    type="submit"
                    onClick={() => {
                      setPostType("A");
                      setDescription("");
                    }}
                  >
                    Post
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      {/*=======================ImageModal========================================  */}
      <Modal open={openImage} onClose={handleCloseImage}>
        <div style={modalStyle} className={classes.paper}>
          <div className={classes.textModalContainer}>
            {/* =============Heading=================== */}
            <div className={classes.textmodalHeading}>
              <h2>Create post</h2>
            </div>
            {/* ==============Title================== */}
            <div className={classes.create__top}>
              <Avatar />
              <form onSubmit={handleSubmit}>
                <TextField
                  required
                  className={classes.create__input}
                  label="Title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                  fullWidth={true}
                />

                {/* ==========Upload Image=============== */}
                <div>
                  <span>Upload Image</span>
                  <input
                    required
                    accept="image/*"
                    type="file"
                    onChange={(e) => setMedia(e.target.files[0])}
                  />
                </div>
                {/* ==================Post Button========== */}
                <div className={classes.postButton}>
                  <Button
                    type="submit"
                    onClick={() => {
                      setPostType("I");
                      setDescription("");
                    }}
                  >
                    Post
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      {/*=================== Create Shouts =================================*/}
      <div className={classes.create__top}>
        <Avatar />
        <form>
          <input
            className={classes.create__input}
            type="text"
            placeholder="What's on your mind,Amy?"
            onClick={handleOpen}
          />
        </form>
      </div>
      {/* ========================Audio/Video/Image Section=================== */}
      <div className={classes.create__bottom}>
        <div className={classes.create__option} onClick={handleOpenVideo}>
          <VideocamIcon style={{ color: "red" }} />
          <h3>Video</h3>
        </div>
        <div className={classes.create__option} onClick={handleOpenImage}>
          <AddAPhotoIcon style={{ color: "green" }} />
          <h3>Photo</h3>
        </div>
        <div className={classes.create__option} onClick={handleOpenAudio}>
          <AudiotrackIcon style={{ color: "yellow" }} />
          <h3>Audio</h3>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  shouts: state.shouts,
  user: state.user,
});
export default connect(mapStateToProps)(CreateShout);
