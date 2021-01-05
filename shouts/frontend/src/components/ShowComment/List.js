import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchComments } from "../../actions/comment_action";
import axios from "axios";
import { FETCH_COMMENTS } from "../../actions/action_types";
import CommentForm from "../ShowComment/comment_Form";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Cookies from "js-cookie";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import { getComments } from "../Services/CommentServices";

const useStyles = makeStyles((theme) => ({
  table: {
    color: "black",
    padding: "1rem 0",
    marginBottom: "1.5rem",
    borderBottom: "white solid",
    textAlign: "left",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const commentList = (props) => {
  const classes = useStyles();
  const authToken = props.user.token;
  const csrftoken = Cookies.get("csrftoken");
  const Remove = (id) => {
    axios({
      method: "DELETE",
      url: `http://localhost:8000/api/shoutcomment/${id}`,
      headers: {
        "X-CSRFToken": csrftoken,
        Authorization: `Token ${authToken}`,
      },
    }).then((res) => getComments(props));
  };

  let fil = props.comments.filter((c) => c.shout_id === props.shouts.post_id);

  const filterdeletedata = (item) => {
    if (props.shouts.username === props.user.username) {
      return (
        <td>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => Remove(item.id)}
          >
            <DeleteIcon />
          </IconButton>
        </td>
      );
    }
    if (item.user_id === props.user.user_id) {
      return (
        <td>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => Remove(item.id)}
          >
            <DeleteIcon />
          </IconButton>
        </td>
      );
    }
  };

  const userdetails = (item) => {
    for (let profile of props.profiles) {
      if (profile.user_id === item.user_id) {
        return (
          <>
            <Avatar
              alt="Brian Adams"
              src={profile.user_image.slice(21)}
              className={classes.large}
            ></Avatar>
            <span>{profile.username}</span>
          </>
        );
      }
    }
  };

  return (
    <>
      <div>
        <h1>Comments:</h1>
        <table className={classes.table}>
          <tbody>
            {fil.map((item, k) => (
              <tr key={k}>
                <th>{userdetails(item)}</th>
                <td>
                  <h3>{item.comment}</h3>
                </td>

                <td>{item.date.substring(0, 10)}</td>
                <td>{item.date.substring(11, 19)}</td>

                {filterdeletedata(item)}
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>
        <CommentForm shouts={props.shouts} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.login,
    like: state.like.like,
    profiles: state.friendList.profiles,
    reports: state.report.report,
    comments: state.Comment.comments,
  };
};

const List = connect(mapStateToProps)(commentList);
export default List;
