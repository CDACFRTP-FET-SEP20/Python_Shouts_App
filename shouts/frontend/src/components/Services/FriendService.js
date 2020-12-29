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

export const newfrienddata = (props) => {
  const pk = props.user.id;
  console.log("service called", pk);

  fetch(`/api/requestsent/${pk}`)
    .then((res) => res.json())
    .then((data) =>
      props.dispatch({
        type: "DisplayRequestsSent",
        payload: data,
      })
    )
    .catch((error) => console.log("errrorrrr==", error));
};
