import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

function Like(props) {
  const [isLiked, setIsLiked] = useState(true);

  const csrftoken = Cookies.get("csrftoken");
  console.log(csrftoken);
  console.log(props.like);

  const getLikes = (props) => {
    fetch("http://localhost:8000/comment_like_report/shoutlike/")
      .then((res) => res.json())
      .then((data) =>
        props.dispatch({
          type: "AddLike",
          payload: data,
        })
      );
  };

  useEffect(() => {
    getLikes(props);
  }, []);

  const [formData, setFormData] = useState({
    user_id: "35213582-5d83-4ee0-b71c-6da160198cf9",
    shout_id: "cbfd8946-7d45-4952-b95b-74922fd08a50",
    like_id: "c07aeff6-84c1-4c78-8a2f-6638c6f14b61",
  });

  console.log("props of Likes", props);

  //---------------GET Like-------------------------//

  // const getLike = (props) => {
  //   fetch("http://localhost:8000/comment_like_report/shoutlike/")
  //     .then((resp) => resp.json())
  //     .then((data) =>
  //       props.dispatch({
  //         type: "setLike",
  //         payload: data,
  //       })
  //     );
  // };
  //---------------- DELETE LIKE ----------------------//
  const deleteLike = () => {
    axios({
      method: "delete",
      url: `http://localhost:8000/comment_like_report/shoutlike/${formData.like_id}/`,
      headers: {
        "X-CSRFToken": csrftoken,
      },
    })
      // .then((res) => getLike(props))
      .then((data) => getLikes(props))
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formdata", formData);

    fetch("http://localhost:8000/comment_like_report/shoutlike/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    })
      .then((response) => response.json())
      .then((data) => getLikes(props));

    setIsLiked(false);

    //   axios
    // .patch(`http://localhost:8000/comment_like_report/shoutlike/`, data)
    // .then((res) => friendlistreceived(props))
    // .catch((error) => console.log(error));
    // console.log(data + "data")
  };

  const handleUnlike = (e) => {
    e.preventDefault();

    setIsLiked(true);
    console.log(formData);

    deleteLike();
  };
  console.log("prop-like==", props.like);
  let fil = props.like.filter(
    (c) => c.shout_id === "cbfd8946-7d45-4952-b95b-74922fd08a50"
  );
  console.log("prop-fil==", fil);
  const like_count = fil.length;
  // const like_count = props.like.length;

  return (
    <div>
      <form action="">
        <p>This is like</p>
        {isLiked ? (
          <div>
            <button
              type="submit"
              name="like_button"
              value="like"
              onClick={handleSubmit}
            >
              <ThumbUpIcon /> Like
            </button>
            <p>{like_count}</p>
          </div>
        ) : (
          <div>
            <button
              type="button"
              name="unlike_button"
              value="like"
              onClick={handleUnlike}
            >
              <ThumbDownIcon /> Unlike
            </button>
            <p>{like_count}</p>
          </div>
        )}

        {like_count}
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    like: state.like.like,
  };
};

export default connect(mapStateToProps)(Like);
