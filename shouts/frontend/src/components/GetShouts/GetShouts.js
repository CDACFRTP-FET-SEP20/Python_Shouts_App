import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { Alert } from "@material-ui/lab";

function GetShouts() {
  fetch("/api/posts/")
    .then((response) => {
      if (response.status > 400) {
        return response;
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
  
  
  return(
    <h1>Getting shouts...</h1>
  )
}

export default GetShouts;
