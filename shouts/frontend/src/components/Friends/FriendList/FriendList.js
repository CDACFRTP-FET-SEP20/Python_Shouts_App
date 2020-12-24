import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

function FriendList(props) {
  useEffect(() => {
    friendlistdata();

    return () => console.log("***************FriendList Unmounted");
  }, []);

  const friendlistdata = () => {
    const pk = props.user.id;
    axios.get(`/api/friendlist/${pk}`).then((res) =>
      props.dispatch({
        type: "DisplayList",
        payload: res.data,
      })
    );
  };

  const unfriendRequest = (data) =>{
    
    axios
      .patch(`/api/friendlist/${data.id}`, data)
      .then((res)=>friendlistdata())
      .catch((error) => console.log(error))

  }

  // console.log("***********", props);

  return (
    <div>
      <div>
        {props.friendList.map((data, item) => {
          return (
            <div key={item}>
              {/* Chnage the name=shubham dynamically using state */}
              {data.receiver === props.user.username ? (
                <p>
                  <span>{data.sender}</span>
                  <button type="button" onClick={() => unfriendRequest(data)}>
                    Unfriend
                  </button>
                </p>
              ) : (
                <p>
                  <span>{data.receiver}</span>
                  <button type="button" onClick={() => unfriendRequest(data)}>
                    Unfriend
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
    friendList: state.friendList.friendList,
    user: state.friendList.user,
  };
};

export default connect(mapStoreToProps)(FriendList);
