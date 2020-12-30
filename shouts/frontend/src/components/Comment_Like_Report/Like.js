import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Cookies from 'js-cookie'


function Like(props) {

  const [isLiked, setIsLiked] = useState(true)

    const csrftoken = Cookies.get("csrftoken")
    console.log(csrftoken)

    const [formData, setFormData] = useState({
        user_id: "35213582-5d83-4ee0-b71c-6da160198cf9",
        shout_id: "b954d35a-de0d-42b4-a021-7f9c61ec0673",
        like_id: "7ac93e10-8830-404d-b831-e59644272a42"
      });

      console.log("props of Likes", props);

      //////////////////GET SHOUT////////////////////

      const getLike = (props) => {
        fetch("http://localhost:8000/comment_like_report/shoutlike/")
          .then((resp) => resp.json())
          .then((data) =>
            props.dispatch({
              type: "setLike",
              payload: data,
            })
          );
      };
      //---------------- DELETE LIKE ----------------------//
      const deleteLike = (props) => {
        axios({
          method: "delete",
          url: `http://localhost:8000/comment_like_report/shoutlike/${formData.like_id}/`,
      
          headers: {
            "X-CSRFToken": csrftoken,
          },
        })
          // .then((res) => getLike(props))
          .then((response) =>console.log(response))
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

      const handleUnlike=(e) => {
        e.preventDefault();
        
        setIsLiked(true);
        console.log(formData);
        
        deleteLike();
      };

    return (
        <div>
            <form action="" >
                <p>This is like</p>
                {isLiked ?
                (
                  <button type="submit" name="like_button" value="like" onClick={handleSubmit}>Like</button>
                ) : (
                  <button type="button" name="unlike_button" value="like" onClick={handleUnlike}>UnLike</button>
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
