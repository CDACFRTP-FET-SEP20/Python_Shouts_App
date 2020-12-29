import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Cookies from 'js-cookie'


function Like(props) {

  const [isLiked, setIsLiked] = useState(true)

    const csrftoken = Cookies.get("csrftoken")
    console.log(csrftoken)

    const [formData, setFormData] = useState({
        user_id: "a7601206-bf52-4641-afb9-42ed62e2fd70",
        shout_id: "91b38b17-75d3-4ef5-ab1d-ad31e6e20fac",
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
            "X-CSRFToken" : csrftoken,
          },
        })
          .then((response) => response.json())
          .then((data) =>
          // props.dispatch({
          //   type: "AddLike",
          //   // payload: data.formData,
          // }),
          console.log(data+"data")
          );

          setIsLiked(false)

      //   axios
      // .patch(`http://localhost:8000/comment_like_report/shoutlike/`, data)
      // .then((res) => friendlistreceived(props))
      // .catch((error) => console.log(error));
      // console.log(data + "data")
      };

      const handleUnlike=(e)=>{
        e.preventDefault();
        setIsLiked(true)
      }

    return (
        <div>
            <form action="" >
                <p>This is like</p>
                {isLiked ?
                (
                  <button type="submit" name="like_button" value="like" onClick={handleSubmit}>Like</button>
                ) : (
                  <button type="submit" name="like_button" value="like" onClick={handleUnlike}>UnLike</button>
                )}
                  
                  
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
