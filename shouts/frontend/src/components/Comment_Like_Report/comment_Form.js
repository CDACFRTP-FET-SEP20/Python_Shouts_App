import React, { Component, useState } from 'react';  
import { connect } from 'react-redux';  
import uuidv1 from "uuid";  
import { addComment } from "../../actions/CommentBox"    
import axios from 'axios'
import Cookies from 'js-cookie'
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

function CommentForm(props){  
    const csrftoken = Cookies.get("csrftoken")
    const [postComment, setPostComment] = useState("")
    // console.log(csrftoken);
    // console.log("comment",props);

    
     
   const handleSubmit=(event)=> {  
        event.preventDefault();  
        axios({
            method: 'POST',
            url: 'http://localhost:8000/comment_like_report/shoutcomment/',
            headers: {
                "X-CSRFToken": csrftoken,
              },
            data: {
              shout_id: "cbfd8946-7d45-4952-b95b-74922fd08a50",
              user_id: "35213582-5d83-4ee0-b71c-6da160198cf9",
              comment: postComment,
              date: "",
              updated_at: ""
            },
          })
          .then((res)=>props.test1())
          // .then((res) => props.dispatch({
          //   type:"AddComment",
          //   payload:res.data
          // }))
          // props.test1();
    }  
  
    const handleChange=(event)=>{  
        setPostComment(event.target.value) 
        }
  
     return (  
     <form onSubmit={handleSubmit}>  
    <div  className="form-group mt-3">  
    <label htmlFor="comment"><strong>Type here:</strong></label>  
    <textarea type="text" className="form-control"  id="comment"  
    value={postComment} onChange={handleChange} />  
    <button type="submit" className="btn btn-success btn-lg mt-2">  
      Comment  
    </button>  
    </div>  
     
    </form>  
        );  
    
} 

// const mapDispatchToProps = ( dispatch ) => {  
//     return {  
//         addComment: comment => dispatch (addComment(comment))  
//     };  
// // };
  
// const Form = connect(null,mapDispatchToProps)(ConnectedForm);  
export default CommentForm;