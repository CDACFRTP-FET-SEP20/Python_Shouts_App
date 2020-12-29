import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Cookies from 'js-cookie'


function Report(props) {

    const csrftoken = Cookies.get("csrftoken")
    console.log(csrftoken)

    const [formData, setFormData] = useState({
        user_id: "a7601206-bf52-4641-afb9-42ed62e2fd70",
        shout_id: "91b38b17-75d3-4ef5-ab1d-ad31e6e20fac",
      });

      console.log("props of Report", props);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("formdata", formData);
    
        fetch("http://localhost:8000/comment_like_report/shoutreport/", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken" : csrftoken,
          },
        })
          .then((response) => response.json())
          .then((data) =>
          // props.dispatch({
          //   type: "AddLike",
          //   // payload: data.formData,
          // }),
          console.log(data+"data")
          );
      };

    return (
        <div>
            <form action="" >
                <p>This is Report</p>
                  <button type="submit" name="like_button" value="like" onClick={handleSubmit}>Report</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      report: state.report,
    };
  };
  
  export default connect(mapStateToProps)(Report);
