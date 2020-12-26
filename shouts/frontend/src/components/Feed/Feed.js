import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import CreateShout from "./CreateShout";
import Shout from "./Shout";
const useStyles = makeStyles({
  feed: {
    flex: 1,
    padding: "30px 150px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
function Feed() {
  const classes = useStyles();
  const [shouts, setShouts] = useState([]);

  return (
    <div className={classes.feed}>
      <CreateShout />
      <Shout
        key={1}
        profilePic="https://images.unsplash.com/photo-1563306406-e66174fa3787?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
        message="This works"
        username="Amy Santiago"
        image="https://images.unsplash.com/photo-1608968037230-ff03de9aa22a?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
      />
      <Shout
        key={2}
        profilePic="https://imag
        es.unsplash.com/photo-1563306406-e66174fa3787?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
        message="This is text"
        username="Amy Santiago"
      />
    </div>
  );
}

export default Feed;
