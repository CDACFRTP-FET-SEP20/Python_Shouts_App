import React, { useState } from "react";
import { connect } from "react-redux";
import { Grid, Paper, Avatar, TextField } from "@material-ui/core";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  avatarTheme: {
    color: "blue",
    background: "linear-gradient(to right, #00d2ff, #3a7bd5)",
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
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    fetch("/profile/login/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((respone) => respone.json())
      .then(
        (data) =>
          props.dispatch({
            type: "AddToken",
            payload: data,
          })

         
        // console.log(data)
      );
      history.push(`/`)
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 350,
    margin: "50px auto",
  };

  const classes = useStyles();

  return (
    <>
      <div>
        <h1>Login Page</h1>

        <form>
          <div>
            <label>Email</label>
            <input
              type="text"
              value={formData.email}
              onChange={handleChange}
              name="email"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={handleChange}
              name="password"
            />
          </div>

          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </form>

        <h2>User Image</h2>
        <Link to="/dashboard">Dashboard</Link>
        <img src={`data:image/png;base64,${props.user.user_image}`} />
      </div>

      {/* <div>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar className={classes.avatarTheme}>
                <LockRoundedIcon />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>

            <TextField label="Email" placeholder="email" fullWidth required />
            <TextField
              label="Password"
              placeholder="password"
              type="password"
              fullWidth
              required
            />

            <TextField
              label="Confirm Password"
              placeholder="Confirm"
              type="password"
              fullWidth
              required
            />
          </Paper>
        </Grid>
      </div> */}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.login,
  };
};

export default connect(mapStateToProps)(login);
