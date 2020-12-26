import { Avatar, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import VideocamIcon from "@material-ui/icons/Videocam";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
const useStyles = makeStyles({
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
});
function CreateShout() {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("post");
  };
  return (
    <div className={classes.create__card}>
      <div className={classes.create__top}>
        <Avatar />
        <form>
          <input
            className={classes.create__input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="What's on your mind,Amy?"
          />
          {/* <IconButton onClick={handleSubmit} type="submit">
            <SendIcon />
          </IconButton> */}
        </form>
      </div>
      <div className={classes.create__bottom}>
        <div className={classes.create__option}>
          <VideocamIcon style={{ color: "red" }} />
          <h3>Video</h3>
        </div>
        <div className={classes.create__option}>
          <AddAPhotoIcon style={{ color: "green" }} />
          <h3>Photo</h3>
        </div>
        <div className={classes.create__option}>
          <AudiotrackIcon style={{ color: "yellow" }} />
          <h3>Audio</h3>
        </div>
      </div>
    </div>
  );
}

export default CreateShout;
