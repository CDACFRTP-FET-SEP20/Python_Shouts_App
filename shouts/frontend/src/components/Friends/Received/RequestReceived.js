import React, { useEffect } from "react";
import { connect } from "react-redux";

function RequestReceived(props) {
  useEffect(() => {
    friendlistreceived();

    return () =>
      console.log("***************FriendRequestsReceivedList Unmounted");
  }, []);

  const friendlistreceived = () => {
    fetch("/api/requestreceived/")
      .then((res) => res.json())
      .then((data) =>
        props.dispatch({
          type: "DisplayRequestsReceived",
          payload: data,
        })
      );
  };

//   console.log("***********", props);

  return (
    <div>
      <div>
        {props.requestReceived.map((data, item) => {
          return (
            <p key={item}>
              {/* Chnage the name=shubham dynamically using state */}
              {data.sender === props.user.username ? null : data.sender}
            </p>
          );
        })}
      </div>
    </div>
  );
}

const mapStoreToProps = (state) => {
  return {
    requestReceived: state.requestReceived.requestReceived,
    user: state.friendList.user
  };
};

export default connect(mapStoreToProps)(RequestReceived);
