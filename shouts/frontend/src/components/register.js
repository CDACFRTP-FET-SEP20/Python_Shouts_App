import React, { useState } from "../../node_modules/react";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  avatarTheme: {
    background: "#4d4dff",
  },
  input: {
    display: "none",
  },
  paperStyle: {
    padding: 20,
    height: "70vh",
    width: 350,
    margin: "50px auto",
  },
});

export default function register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    is_active: true,
  });

  const history = useHistory();

  const [confirmPassword, setConfirmPassword] = useState("");

  const [imageData, setImageData] = useState(null);

  const handleChange = ({ target }) => {
    console.log(target);

    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirmPassword = ({ target }) => {
    setConfirmPassword(target.value);
  };

  // const handleFileChange = (e) => {
  //   setImageData(e.target.files[0]);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const post_data = new FormData();

    // for (let key in formData) {
    //   post_data.append(key, formData[key]);
    // }

    // post_data.append("user_image", imageData, imageData.name);
    // post_data.append("is_active", true);

    console.log("formdata", formData);
    console.log("Confirm Password", confirmPassword);

    if (formData.password === confirmPassword) {
      fetch("http://localhost:8000/profile/register/", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((respone) => respone.json())
        .then((data) => {
          console.log("data", data);
          history.push("/login");
        });
    } else {
      alert("Password and Confirm Password should be same");
    }
    // console.log("formdata", post_data);
  };

  const classes = useStyles();
  return (
    <>
      {/* <div>
        <h1>Register Page</h1>

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
            <label>Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={handleChange}
              name="username"
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
          <div>
            <label>Bio</label>
            <input
              type="text"
              value={formData.bio}
              onChange={handleChange}
              name="bio"
            />
          </div>

          <div>
            <label>Profile Image</label>
            <input type="file" onChange={handleFileChange} />
          </div>

          <button type="submit" onClick={handleSubmit}>
            Register
          </button>
        </form>
      </div> */}

      <div>
        <Grid>
          <Paper elevation={10} className={classes.paperStyle}>
            <Grid align="center">
              <Avatar className={classes.avatarTheme}>
                <LockRoundedIcon />
              </Avatar>
              <h2>Register</h2>
            </Grid>

            <TextField
              label="Username"
              placeholder="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              required
            />

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
            <TextField
              label="Confirm Password"
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
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
              Register
            </Button>
            <br />
            <br />
            <br />
          </Paper>
        </Grid>
      </div>
    </>
  );
}
