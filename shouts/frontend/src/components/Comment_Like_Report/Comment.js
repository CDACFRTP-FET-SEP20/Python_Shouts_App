import React, { useState } from "react";
import { connect } from "react-redux";

function Comment(props) {

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
