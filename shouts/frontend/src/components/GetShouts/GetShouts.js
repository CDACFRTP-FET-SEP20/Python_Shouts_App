import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Cards from '../Card'
import { Alert } from "@material-ui/lab";

function GetShouts() {
  const [shouts,setShouts]=useState([])
  fetch("/api/posts/")
    .then((response) => {
      if (response.status > 400) {
        return response;
      }
      return response.json();
    })
    .then((data) => {
      setShouts(data)
      
    });
  
  
  return(
    <div>
      {
        shouts.map((shout)=>(
          <Cards key={shout.post_id} shouts={shout}/>
        ))
      }
    </div>
  
  )
}

export default GetShouts;
