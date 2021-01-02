import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchComments } from "../../actions/comment_action";
import axios from "axios";
import { FETCH_COMMENTS } from "../../actions/action_types";
import CommentForm from "../Comment_Like_Report/comment_Form";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  table: {
    color: "black",
    padding: "1rem 0",
    marginBottom: "1.5rem",
    borderBottom: "white solid",
    textAlign: "left",
  },
}));

const commentList = (props) => {
  // const [comm, setComm] = useState(initialState)
  const classes = useStyles();

  const test1 = (props) => {
    console.log("hi");
    axios
      .get(`http://localhost:8000/comment_like_report/shoutcomment/`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        props.dispatch({ type: FETCH_COMMENTS, payload: data });
      });
  };

  useEffect(() => {
    test1(props);

    // fetchComments(props)
  }, []);

  let fil = props.comments.filter(
    (c) => c.shout_id === "cbfd8946-7d45-4952-b95b-74922fd08a50"
  );
  console.log(
    props.comments.find(
      (c) => c.shout_id === "b954d35a-de0d-42b4-a021-7f9c61ec0673"
    )
  );

  return (
    <>
      <div>
        <h1>Comments:</h1>
        <table className={classes.table}>
          {fil.map((item, k) => (
            //     <p key={k}> {item.comment}      on   {item.date.substring(0, 10)}  {item.date.substring(12, 19)} p.m.</p>
            // )}

            <tr key={k}>
              <th>{item.comment}</th>
              <td>{item.date.substring(0, 10)}</td>
              <td>{item.date.substring(11, 19)}</td>
              {/* <td>{item.date.substring(0, 20)} p.m.</td> */}
            </tr>
          ))}
        </table>
        <CommentForm test1={() => test1(props)} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { comments: state.Comment.comments };
};

const List = connect(mapStateToProps)(commentList);
export default List;
