import React, { useState } from "react";
import { connect } from "react-redux";

function Like(props) {

    const [formData, setFormData] = useState({
        user_id: "afe3e1c4-c94a-48e4-b6e3-1ebb6de82d79",
        shout_id: "4dc2eb3b-03aa-42fe-9175-172b62f5a34c",
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
        //   props.dispatch({
        //     type: "AddLike",
        //     // payload: data.formData,
        //   })
        console.log(data+"data")
          );
      };

    return (
        <div>
            <form action="" >
                <p>This is like</p>
                <button type="submit" name="like_button" value="like" onClick={handleSubmit}>Like</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      like: state.like,
    };
  };
  
  export default connect(mapStateToProps)(Like);
