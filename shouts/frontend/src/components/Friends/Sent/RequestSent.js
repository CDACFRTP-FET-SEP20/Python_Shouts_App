import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

function RequestSent(props) {
  useEffect(() => {
    newfrienddata();

    return () => console.log("***************sent request Unmounted");
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

  console.log("***********", props.user);

  const sendRequest = (receiver) => {
    console.log("Sender=====", props.user);
    console.log("receiver=====", receiver);
    // console.log("receiver=====", receiver);
    //
    // try {
    //   fetch("/api/friendlist/", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       sender: props.user,
    //       receiver: receiver,
    //       is_friend: false,
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => console.log("then data", data))
    //     .catch((e) => {
    //       console.log("error msg catch", e);
    //     });
    // } catch (error) {
    //   console.log("error msg for fetch", error);
    // }
    const data1 = {
      sender: props.user,
      receiver: receiver,
    };
    // const data1 = {
    //   bio: " gbfbf fjh oehf kjbfkj i",
    //   username: "Subodh",
    // };
    axios
      .post("/api/friendlist/", data1)
      .then((res) => console.log("-----------", res))
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
