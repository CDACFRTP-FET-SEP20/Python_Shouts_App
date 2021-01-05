import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
paper: {
  position: "absolute",
  top: "calc(50% - 9rem)",
  left: "calc(50% - 13rem)",
  width: "80vmin",
  borderRadius:"15px",
  backgroundColor:"white",
  outline:0,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
},
h3: {
  fontSize: "20px",
  color: "#000",
  marginBottom: "1rem",
  paddingBottom: "1rem",
  borderBottom: "1px solid #000",
},
cancel: {
  marginRight: "5px",
},
btnDiv: {
  textAlign: "end",
},
span: {
  fontWeight: "bold",
},
delete: {
  marginRight: "5px",
},
}));

function Comment(props) {

    const classes = useStyles();
    const csrftoken = Cookies.get("csrftoken");

    const [formData, setFormData] = useState({
        user_id: "",
        shout_id: "",
      });

      console.log("props of Likes", props);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("formdata", formData);
    
        fetch("http://localhost:8000/comment_like_report/shoutlike/", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((respone) => respone.json())
          .then((data) =>
          props.dispatch({
            type: "AddComment",
            payload: data.token,
          })
          );
      };

    return (
        <div>
            <form action="" >
                <h1>This is Like component</h1>
                <button type="submit" name="like_button" value="like" onClick={handleSubmit}>Like</button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={props.open}
                  onClose={props.handleClose}
                >
                  <h1>Inside Comment Modal</h1>
                </Modal>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      comment: state.comment,
    };
  };
  
  export default connect(mapStateToProps)(Comment);
