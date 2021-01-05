import React, { Component, useState } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addComment } from "../../actions/CommentBox";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { getComments } from "../Services/CommentServices";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";

function CommentForm(props) {
  const csrftoken = Cookies.get("csrftoken");
  const [postComment, setPostComment] = useState("");
  const authToken = props.user.token;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:8000/api/shoutcomment/",
      headers: {
        "X-CSRFToken": csrftoken,
        Authorization: `Token ${authToken}`,
      },
      data: {
        shout_id: props.shouts.post_id,
        user_id: props.user.user_id,
        comment: postComment,
      },
    }).then((res) => getComments(props));
  };

  const handleChange = (event) => {
    setPostComment(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mt-3">
        <label htmlFor="comment">
          <strong>Type here:</strong>
        </label>
        <textarea
          type="text"
          className="form-control"
          id="comment"
          value={postComment}
          onChange={handleChange}
        />
        <IconButton
          type="submit"
          className="btn btn-success btn-lg mt-2"
          color="primary"
        >
          <SendIcon></SendIcon>
        </IconButton>
      </div>
    </form>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.login,
    like: state.like.like,
    profiles: state.friendList.profiles,
    reports: state.report.report,
    comments: state.Comment.comments,
  };
};

export default connect(mapStateToProps)(CommentForm);
