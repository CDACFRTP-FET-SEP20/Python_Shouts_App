import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
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

function login(props) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  console.log("props-user", props.user);

  const handleChange = ({ target }) => {
    console.log(target);

    const { name, value } = target;
    console.log("name", name);
    console.log("value", value);

    setFormData({ ...formData, [name]: value });
  };

  const pushfunction = () => {
    history.push(`/`);
  };

  const userdatafunction = (data) => {
    fetch(`http://localhost:8000/profile/getProfile/${data.user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        props.dispatch({
          type: "AddUser",
          payload: data,
        });
      });
  };
  const tokenfunction = (data) => {
    props.dispatch({
      type: "AddToken",
      payload: data,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login Submit===", formData);

    fetch("/profile/login/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((respone) => respone.json())
      .then((data) => {
        props.dispatch({
          type: "AddToken",
          payload: data,
        });
      });

    // pushfunction();
  };
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 350,
    margin: "50px auto",
  };

  console.log("state data", props.userdata);

  const classes = useStyles();

  return (
    <>
      <div>
        <Grid>
          <Paper elevation={10} className={classes.paperStyle}>
            <Grid align="center">
              <Avatar className={classes.avatarTheme}>
                <LockRoundedIcon />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>

            <TextField
              label="Email"
              placeholder="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Password"
              placeholder="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />

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
              Sign In
            </Button>
            <br />
            <br />
            <br />

            <Typography>
              Don't have an account yet?
              <Link to="/register">Sign Up</Link>
            </Typography>
          </Paper>
        </Grid>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.login,
  };
};

export default connect(mapStateToProps)(login);
