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
import { updatePost } from "../../actions/PostActions";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "calc(50% - 9rem)",
    left: "calc(50% - 13rem)",
    width: "80vmin",
    borderRadius: "15px",
    backgroundColor: "white",
    outline: 0,
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

function EditModal(props) {
  const classes = useStyles();
  const [media,setMedia]=useState("")
  const [values, setValues] = useState({
    title: props.postTitle,
    description: props.postContent,
    username: "21972bf4-f2c5-4658-b08a-6378034f8ee1",
    media:props.media
  });

  // state to control the progress waiting component
  const [progress, setProgress] = useState(false);
  const csrftoken = Cookies.get("csrftoken");
  // change the state each time the component rerender
  useEffect(() => {
    setValues({
      title: props.postTitle,
      description: props.postContent,
      username: "21972bf4-f2c5-4658-b08a-6378034f8ee1",
      media:props.media
    });
  }, [props.postTitle, props.postContent]);

  const onInputChange = (e) => {
    setValues({ ...values, [e.target.title]: e.target.value,[e.target.description]:e.target.value });
    setMedia(media)
  console.log(media);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(media);
    setValues({ ...values, [e.target.title]: e.target.value,[e.target.description]:e.target.value,  media:media });
    updatePost(props, values);

    props.handleClose();
  };

  const onCloseModal = () => {
    props.handleClose();
    setValues({
      title: props.postTitle,
      description: props.postContent,
      username: "21972bf4-f2c5-4658-b08a-6378034f8ee1",
      media:props.media
    });
  };

  return (
    <div>
      <Modal
        aria-labelledby="title"
        aria-describedby="description"
        open={props.open}
        onClose={props.onCloseModal}
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
              name="description"
              label="description"
              multiline={true}
              rowsMax="4"
              value={values.description}
              onChange={onInputChange}
              margin="normal"
              fullWidth={true}
            />
            <div>
                  <span>Upload Image</span>
                  <input
                    required
                    name="media"
                    accept="image/*"
                    type="file"
                    onChange={(e) => setMedia(e.target.files[0])}
                  />
                </div>
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
