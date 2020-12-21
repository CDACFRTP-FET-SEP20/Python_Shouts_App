import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'

function CreateShout() {
    fetch("/api/posts/", {
     
    })
      .then(response => {
        if (response.status > 400) {
          return response;
        }
        return response.json();
      })
      .then(data => {
        
        console.log(data);
      });
  
return(
    <h1>Shouts</h1>
)
}

export default CreateShout
