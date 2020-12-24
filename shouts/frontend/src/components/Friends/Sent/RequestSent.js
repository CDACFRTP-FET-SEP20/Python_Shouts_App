import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

function RequestSent(props) {
  useEffect(() => {
    newfrienddata();

    return () => console.log("***************sent request Unmounted");
  }, []);
  const pk = props.user.id;
  const newfrienddata = () => {
    fetch(`/api/requestsent/${pk}`)
      .then((res) => res.json())
      .then((data) =>
        props.dispatch({
          type: "DisplayRequestsSent",
          payload: data,
        })
      );
  };

  console.log("***********", props.user);

  const sendRequest = (receiver) => {
    console.log("Sender=====", props.user);
    console.log("receiver=====", receiver);

    const data1 = {
      receiver: receiver,
    };

    axios
      .post(`/api/friendlist/${pk}`, data1)
      .then((res) => newfrienddata())
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        {props.requestSent.map((data, item) => {
          return (
            <div key={item}>
              {/* Chnage the name=shubham dynamically using state */}
              {data.username === props.user.username ? null : (
                <p>
                  <span>{data.username}</span>
                  <button type="button" onClick={() => sendRequest(data)}>
                    send request
                  </button>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStoreToProps = (state) => {
  return {
    requestSent: state.requestSent.requestSent,
    user: state.friendList.user,
  };
};

export default connect(mapStoreToProps)(RequestSent);
