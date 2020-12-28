import axios from "axios";

export const friendlistdata = (props) => {
  console.log("services=============", props);

  const pk = props.user.id;
  axios.get(`/api/friendlist/${pk}`).then((res) =>
    props.dispatch({
      type: "DisplayList",
      payload: res.data,
    })
  );
};

export const friendlistreceived = (props) => {
  const pk = props.user.id;
  fetch(`/api/requestreceived/${pk}`)
    .then((res) => res.json())
    .then((data) =>
      props.dispatch({
        type: "DisplayRequestsReceived",
        payload: data,
      })
    );
};

export const searchField = (value) => {
  console.log(value);
};
