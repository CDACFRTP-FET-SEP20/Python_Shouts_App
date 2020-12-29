import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import CreateShout from "./CreateShout";
import Shout from "./Shout";

import { connect } from "react-redux";
import {getPosts} from '../../actions/PostActions'
const useStyles = makeStyles({
  feed: {
    flex: 1,
    padding: "30px 150px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
function Feed(props) {
  const classes = useStyles();
  const [shouts, setShouts] = useState([]);
  useEffect(() => {
   
      
    getPosts(props);
      
    
  },[] );

  return (
    <div className={classes.feed}>
      <CreateShout />
      {props.shouts.map((shout) => (
        <Shout key={shout.post_id} shouts={shout} />
      ))}
    </div>
  );
}
const mapStateToProps = (state) => ({
  shouts: state.shouts,
});
export default connect(mapStateToProps)(Feed);
