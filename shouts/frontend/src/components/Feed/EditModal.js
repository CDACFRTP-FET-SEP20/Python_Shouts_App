import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Modal } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import Cookies from "js-cookie";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "calc(50% - 9rem)",
    left: "calc(50% - 13rem)",
    width: "80vmin",
    backgroundImage: "var(--user-bg2)",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: "#ccc",
  },
  h2: {
    color: "#102016",
    padding: "1rem 0",
    marginBottom: "1.5rem",
    borderBottom: "white solid",
    textAlign: "center",
  },
  button: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  cancel: {
    marginRight: "5px",
  },
  btnDiv: {
    textAlign: "end",
  },
}));

function EditModal({
  open,
  handleClose,
  postTitle,
  postContent,
  postId,
  props,
}) {
  const classes = useStyles();
  const [values, setValues] = useState({
    title: postTitle,
    content: postContent,
    username: "21972bf4-f2c5-4658-b08a-6378034f8ee1",
  });

  // state to control the progress waiting component
  const [progress, setProgress] = useState(false);
  const csrftoken = Cookies.get("csrftoken");
  // change the state each time the component rerender
  useEffect(() => {
    setValues({
      title: postTitle,
      content: postContent,
      username: "21972bf4-f2c5-4658-b08a-6378034f8ee1",
    });
  }, [postTitle, postContent]);

  const onInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    // setProgress(true);
    setValues({ ...values, [e.target.name]: e.target.value });
    axios({
      method: "put",
      url: `/api/posts/${postId}/`,
      data: values,
      headers: {
        "X-CSRFToken": csrftoken,
      },
    }).then(
      (res) => console.log(res)
      //   props.dispatch({
      //     type: "edit_post",
      //     payload: res,
      //   })
    );
    handleClose();
  };

  const onCloseModal = () => {
    handleClose();
    setValues({
      title: postTitle,
      content: postContent,
      username: "21972bf4-f2c5-4658-b08a-6378034f8ee1",
    });
  };

  return (
    <div>
      <Modal
        aria-labelledby="title"
        aria-describedby="description"
        open={open}
        onClose={onCloseModal}
      >
        <div className={classes.paper}>
          <h2 className={classes.h2} id="title">
            Add A New Post
          </h2>
          <form id="description" onSubmit={onFormSubmit}>
            <TextField
              required
              label="Title"
              type="text"
              value={values.title}
              onChange={onInputChange}
              name="title"
              fullWidth={true}
            />
            <TextField
              required
              name="content"
              label="Content"
              multiline={true}
              rowsMax="4"
              value={values.content}
              onChange={onInputChange}
              margin="normal"
              fullWidth={true}
            />
            <div className={classes.btnDiv}>
              <Button
                className={classes.cancel}
                onClick={onCloseModal}
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Update
                <Icon className={classes.rightIcon}></Icon>
              </Button>
              <CircularProgress
                style={
                  progress ? { display: "inline-block" } : { display: "none" }
                }
              />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) => ({
  shouts: state.shouts,
});
export default connect(mapStateToProps)(EditModal);
