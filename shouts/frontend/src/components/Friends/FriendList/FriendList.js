import React, { useEffect } from "react";
import { connect } from "react-redux";

function FriendList(props) {
  useEffect(() => {
    friendlistdata();

    return () => console.log("***************FriendList Unmounted");
  }, []);

  const friendlistdata = () => {
    fetch("/api/friendlist/")
      .then((res) => res.json())
      .then((data) =>
        props.dispatch({
          type: "DisplayList",
          payload: data,
        })
      );
  };

  console.log("***********", props);

  return (
    <div>
      <div>
        {props.friendList.map((data, item) => {
          return (
            <p key={item}>
              {/* Chnage the name=shubham dynamically using state */}
              {data.receiver === props.user.username ? data.sender : data.receiver}
            </p>
          );
        })}
      </div>
    </div>
  );
}

const mapStoreToProps = (state) => {
  return {
    friendList: state.friendList.friendList,
    user: state.friendList.user
  };
};

export default connect(mapStoreToProps)(FriendList);
