import React, { useEffect, useRef, useState } from "react";

import { connect } from "react-redux";
import axios from "axios";
import Shout from "./Shout";
import CreateShout from "./CreateShout";
import {getMyPost} from '../../actions/PostActions'
function MyShouts(props) {
  var user_id = "21972bf4-f2c5-4658-b08a-6378034f8ee1";
  useEffect(() => {
    console.log("myshouts");
    getMyPost(props,user_id);
    
    
  },[] );

  return (
    <div>
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
export default connect(mapStateToProps)(MyShouts);
