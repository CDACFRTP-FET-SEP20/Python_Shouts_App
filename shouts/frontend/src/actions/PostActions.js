import axios from "axios";
import Cookies from "js-cookie";

const csrftoken = Cookies.get("csrftoken");
// ===============================GetPosts================================
export const getPosts = (props) => {
  fetch("/api/posts/")
    .then((resp) => resp.json())
    .then((data) =>
      props.dispatch({
        type: "setShouts",
        payload: data,
      })
    );
};
// ===============================CreatePosts================================
export const createPost = (props, uploadData) => {
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
};
// ===============================DeletePosts================================
export const deletePost = (props) => {
  axios({
    method: "delete",
    url: `/api/posts/${props.postId}/`,

    headers: {
      "X-CSRFToken": csrftoken,
    },
  })
    .then((res) => getPosts(props))
    .catch((error) => console.log(error));
};
// ===============================DeletePosts================================
export const deleteMyPost = (props) => {
  console.log(props);
  axios({
    method: "delete",
    url: `/api/posts/${props.postId}/`,

    headers: {
      "X-CSRFToken": csrftoken,
    },
  })
    .then((res) => getMyPost(props, props.user.user_id))
    .catch((error) => console.log(error));
};

// ===============================UpdatePosts================================
export const updatePost = (props, values) => {
  console.log(values);
  axios({
    method: "patch",
    url: `/api/posts/${props.postId}/`,
    data: values,
    headers: {
      "X-CSRFToken": csrftoken,
    },
  })
    .then((res) => getPosts(props))
    .catch((error) => console.log(error));
};
// ===============================UpdatePosts================================
export const updateMyPost = (props, values) => {
  console.log(props.myshout);
  axios({
    method: "patch",
    url: `/api/posts/${props.postId}/`,
    data: values,
    headers: {
      "X-CSRFToken": csrftoken,
    },
  })
    .then((res) => getMyPost(props, props.user.user_id))
    .catch((error) => console.log(error));
};
// ===============================GetMyPost================================
export const getMyPost = (props, user_id) => {
  const authToken = props.user.token;
  fetch("/api/mypostlist/" + user_id + "/", {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  })
    .then((resp) => resp.json())
    .then((data) =>
      // console.log(data)
      props.dispatch({
        type: "setMyShouts",
        payload: data,
      })
    );
};
