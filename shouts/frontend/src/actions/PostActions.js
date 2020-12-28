import axios from 'axios'
import Cookies from "js-cookie";

const csrftoken = Cookies.get("csrftoken");
// ===============================GetPosts================================
export const getPosts=(props)=>{
  fetch("/api/posts/")
  .then((resp) => resp.json())
  .then((data) =>
    props.dispatch({
      type: "setShouts",
      payload: data,
    })
  );
}
// ===============================CreatePosts================================
export const createPost=(props,uploadData)=>{
  axios({
    method: "post",
    url: "/api/posts/",
    data: uploadData,
    headers: {
      "X-CSRFToken": csrftoken,
    },
  }).then((res) =>
    props.dispatch({
      type: "createShouts",
      payload: res,
    })
  );
}
// ===============================DeletePosts================================
export const deletePost=(props)=>{
axios({
  method: "delete",
  url: `/api/posts/${props.postId}/`,

  headers: {
    "X-CSRFToken": csrftoken,
  },
}).then((res)=>getPosts(props))
.catch((error)=>console.log(error))
}

// ===============================UpdatePosts================================
export const updatePost=(props,values)=>{
  
    
  console.log(values);
  axios({
    method: "put",
    url: `/api/posts/${props.postId}/`,
    data:values,
    headers: {
      "X-CSRFToken": csrftoken,
    },
  }).then((res)=>getPosts(props))
  .catch((error)=>console.log(error))
  }