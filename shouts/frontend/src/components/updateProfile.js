import React, { useState } from "react";
import { connect } from "react-redux";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UpdateIcon from "@material-ui/icons/Update";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  avatarTheme: {
    background: "#4d4dff",
  },

  paperStyle: {
    padding: 20,
    height: "70vh",
    width: 350,
    margin: "50px auto",
  },
});

function updateProfile(props) {
  const [bio, setBio] = useState("");
  const history = useHistory();
  const [imageData, setImageData] = useState(null);
  const authToken = props.user.token;

  const handlefilechange = (e) => {
    setImageData(e.target.files[0]);
  };

  console.log(props);

  let postData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();

    let bioObj;
    let resultObj;

    if (imageData === null && bio != "") {
      postData.append("bio", bio);
    } else if (imageData != null && bio === "") {
      postData.append("user_image", imageData, imageData.name);
    } else {
      postData.append("bio", bio);
      postData.append("user_image", imageData, imageData.name);
    }

    fetch(`http://localhost:8000/profile/getProfile/${props.user.user_id}`, {
      method: "PATCH",
      body: postData,
      headers: {
        Authorization: `Token ${authToken}`,
      },
    })
      .then((respone) => respone.json())
      .then((data) => {
        console.log("send data---", data);
        props.dispatch({
          type: "UpdateUser",
          payload: { bio: bio },
        });
      });

    history.push("/");
  };

  const classes = useStyles();
  return (
    <div>
      <Grid>
        <Paper elevation={10} className={classes.paperStyle}>
          <Grid align="center">
            <Avatar className={classes.avatarTheme}>
              <UpdateIcon />
            </Avatar>
            <h2>Update Profile</h2>
          </Grid>
          <TextField
            label="Update Bio"
            placeholder="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            fullWidth
            required
          />
          <br />
          <br />
          <br />
          <label htmlFor="upload-photo">
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="upload-photo"
              // value={props.}
              onChange={handlefilechange}
              type="file"
            />

            <Button color="secondary" variant="contained" component="span">
              Upload Profile Picture
            </Button>
          </label>

          <br />
          <br />
          <br />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            fullWidth
          >
            Update
          </Button>
          <br />
          <br />
          <br />
        </Paper>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.login,
  };
};

export default connect(mapStateToProps)(updateProfile);
