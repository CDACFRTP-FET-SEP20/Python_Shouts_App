import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Avatar, Button, makeStyles } from "@material-ui/core";

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
import { createPost } from "../../actions/PostActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper_grid: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "15px",
  },
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
    width: "100%",

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
function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
function CreateShouts(props) {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [post_type, setPostType] = useState("T");
  const [modalStyle] = useState(getModalStyle);
  const [openText, setOpenText] = useState(false);

  var date = new Date();

  var post_date = dateFormat(date, "yyyy-mm-dd HH:MM");
  // ==========================Text Modal Controls======================================

  const handleOpen = () => {
    setOpenText(true);
  };
  const handleClose = () => {
    setOpenText(false);
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
    createPost(props, uploadData);

    setOpenText(false);
  };
  var mediaType = "";
  if (post_type === "A") mediaType = "audio/*";
  else if (post_type === "V") mediaType = "video/*";
  else mediaType = "image/*";
  return (
    <div className={classes.root}>
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
                {post_type === "T" ? (
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
                ) : (
                  <div>
                    <span>Upload File</span>
                    <input
                      accept={mediaType}
                      type="file"
                      required
                      onChange={(e) => setMedia(e.target.files[0])}
                    />
                  </div>
                )}

                {/* ==================Post Button========== */}
                <div className={classes.postButton}>
                  <Button type="submit">Post</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      {/*======================Create Shouts============= */}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper_grid}>
            <div className={classes.create__top}>
              <Avatar />
              <form>
                <input
                  className={classes.create__input}
                  type="text"
                  placeholder="What's on your mind,Amy?"
                  onClick={()=>{handleOpen();
                  setPostType("T")}}
                />
              </form>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper_grid}>
          <div className={classes.create__bottom}>
        <div
          className={classes.create__option}
          onClick={() => {
            handleOpen();
            setPostType("V");
            setDescription("");
          }}
        >
          <VideocamIcon style={{ color: "red" }} />
          <h3>Video</h3>
        </div>
        <div
          className={classes.create__option}
          onClick={() => {
            handleOpen();
            setPostType("I");
            setDescription("");
          }}
        >
          <AddAPhotoIcon style={{ color: "green" }} />
          <h3>Photo</h3>
        </div>
        <div
          className={classes.create__option}
          onClick={() => {
            handleOpen();
            setPostType("A");
            setDescription("");
          }}
        >
          <AudiotrackIcon style={{ color: "yellow" }} />
          <h3>Audio</h3>
        </div>
      </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
const mapStateToProps = (state) => ({
    shouts: state.shouts,
    user: state.user,
  });
export default connect(mapStateToProps)(CreateShouts);
