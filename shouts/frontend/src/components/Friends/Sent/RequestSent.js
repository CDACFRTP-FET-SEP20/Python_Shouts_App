import React, { useEffect } from "react";
import { connect } from "react-redux";

function RequestSent(props) {
  useEffect(() => {
    newfrienddata();

    return () => console.log("***************FriendList Unmounted");
  }, []);

  const newfrienddata = () => {
    fetch("/api/requestsent/")
      .then((res) => res.json())
      .then((data) =>
        props.dispatch({
          type: "DisplayRequestsSent",
          payload: data,
        })
      );
  };

  console.log("***********", props);

  const sendRequest = (receiver) => {
    console.log(receiver);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: props.user,
        receiver,
      }),
    };
    fetch("/api/friendlist/", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
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
                  <button type="button" onClick={()=>sendRequest(data)}>
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
