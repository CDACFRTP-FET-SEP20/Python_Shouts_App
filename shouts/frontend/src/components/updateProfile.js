import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Input,
} from "@material-ui/core";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import { makeStyles } from "@material-ui/core/styles";
import ImageIcon from "@material-ui/icons/Image";
import { Link } from "react-router-dom";

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

export default function updateProfile() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    bio: "",
  });

  const [imageData, setImageData] = useState(null);

  const classes = useStyles();
  return (
    <div>
      <Grid>
        <Paper elevation={10} className={classes.paperStyle}>
          <Grid align="center">
            <Avatar className={classes.avatarTheme}>
              <LockRoundedIcon />
            </Avatar>
            <h2>Update Profile</h2>
          </Grid>

          <TextField
            label="Username"
            placeholder="username"
            name="username"
            // value={formData.email}
            // onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Password"
            placeholder="password"
            type="password"
            name="password"
            // value={formData.password}
            // onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Bio"
            placeholder="bio"
            name="bio"
            // value={formData.email}
            // onChange={handleChange}
            fullWidth
            required
          />

          <br />
          <br />
          <br />

          <label>Change Profile Picture</label>

          <Input type="file">
            <ImageIcon></ImageIcon>
          </Input>

          <br />
          <br />
          <br />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            // onClick={handleSubmit}
            fullWidth
          >
            Sign In
          </Button>
          <br />
          <br />
          <br />
        </Paper>
      </Grid>
    </div>
  );
}
