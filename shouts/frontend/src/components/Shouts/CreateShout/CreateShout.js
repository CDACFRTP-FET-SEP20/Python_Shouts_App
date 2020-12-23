import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import Cookies from "js-cookie";

function CreateShout(props) {
  const [formData, setFormData] = useState({});
  const [media, setMedia] = useState("");
  const history = useHistory();

  //============================set the Form data on InputChange===================
  function handleInputChange({ target }) {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  }
  const csrftoken = Cookies.get("csrftoken");
  console.log(csrftoken);
  const { title,post_type,description, date_posted } = formData;

  //===========================Form Submit Function============================
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(formData);
    const uploadData = new FormData();
    uploadData.append("title", formData.title);
    uploadData.append("post_type", formData.post_type);
    uploadData.append("description", formData.description);
    uploadData.append("date_posted", formData.date_posted);
    uploadData.append("username", "21972bf4-f2c5-4658-b08a-6378034f8ee1");
    uploadData.append("media", media);
    axios
      .post("/api/posts/", uploadData)
      .then((res) => props.dispatch({
        type:"createShouts",
        payload:res
      }))
      .catch((err) => console.log(err));
      history.push('/shouts')
  }

  return (
    <div>
      <div>
        <h1>Create New Shout</h1>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Title: </label>
          <input type="text" name="title" value={title} onChange={handleInputChange}/>
        </div>
        <div>
          <label>Content Type</label>
          <select name="post_type" value={post_type} onChange={handleInputChange}>
            <option value="I">Image</option>
            <option value="A" selected>Audio</option>
            <option value="V">Video</option>
            <option value="T">Text</option>
          </select>
        </div>
        <div>
          <label>description: </label>
          <input type="text" name="description" value={description} onChange={handleInputChange}/>
        </div>
        <div>
          <label>description: </label>
          <input type="date" name="date_posted" value={date_posted} onChange={handleInputChange}/>
        </div>
        {/*===============Render required component according to content type=============  */}
        {post_type !== "T" ? (
          <div>
            <div>
              <span>Upload Image</span>
              <input
                type="file"
                onChange={(e) => setMedia(e.target.files[0])}
              />
            </div>
          </div>
        ) : (
          <div>
            <label>Blog Text</label>
            <textarea
              name="content"
              value={description}
              required
              maxLength="200"
              onChange={handleInputChange}
            />
          </div>
        )}

        <button type="Submit">Submit</button>
      </form>
    </div>
  );
}
const mapStateToProps = (state) => ({
  shouts: state.shouts,
  user: state.user,
});
export default connect(mapStateToProps)(CreateShout);
