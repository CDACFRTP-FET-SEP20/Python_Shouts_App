import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import Cookies from 'js-cookie'

function CreateShout(props) {
  const [formData, setFormData] = useState({});
  const [media,setMedia]=useState("")
  const history=useHistory()
  //============================set the Form data on InputChange===================
  function handleInputChange({ target }) {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  }
const csrftoken=Cookies.get('csrftoken')
console.log(csrftoken);
  const { description,type } = formData;
  let _data = {
    post_title: "foo",
    description: "BAR",
    post_type:"T",
    date_posted: "2020-12-21T11:26:12.409584Z",
    username: {
      user_id: "21972bf4-f2c5-4658-b08a-6378034f8ee1",
      username: "Amy Santiago",
      password: "abc",
      email: "amy@cybage.com",
      
      bio: "I am sergeant at NYPD.",
    },
    media:media,
  };
  //===========================Form Submit Function============================
  function handleFormSubmit(e) {
    e.preventDefault();
    fetch("/api/posts/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken":csrftoken,
      },
      body: JSON.stringify(_data),
    })
      .then((response) => response.json())
      .then((data) => props.dispatch({
        type: "createShouts",
        payload: data,
      }));
    
    
  }

  

  return (
    <div className="container-create">
      <div className="create-new-blog">
        <h1>Create New Shout</h1>
      </div>
      <form className="create-new" onSubmit={handleFormSubmit}>
        <div className="control-wrapper">
          <label>Content Type</label>
          <select name="type" value={type} onChange={handleInputChange}>
            <option value="image">Image</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
            <option value="text">Text</option>
          </select>
        </div>
        {/*===============Render required component according to content type=============  */}
        {type !== "text" ? (
          <div className="file-field input-field">
            <div className="btn  #42a5f5 blue darken-1">
              <span>Upload Image</span>
              <input type="file" onChange={(e) => setMedia(e.target.files[0])}/>
            </div>
            
          </div>
        ) : (
          <div className="control-wrapper">
            <label>Blog Text</label>
            <textarea name="content" value={description} required maxLength="200" onChange={handleInputChange} />
          </div>
        )}

        <button type="Submit">Submit</button>
      </form>
    </div>
  );
}
const mapStateToProps = (state) => ({
  shouts: state.shouts,
});
export default connect(mapStateToProps)(CreateShout);
