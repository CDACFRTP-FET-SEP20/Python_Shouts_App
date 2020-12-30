import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Cookies from 'js-cookie'


function Report(props) {

    const [isReported, setIsReported] = useState(true)

    const csrftoken = Cookies.get("csrftoken")
    console.log(csrftoken)

    const [formData, setFormData] = useState({
        user_id: "35213582-5d83-4ee0-b71c-6da160198cf9",
        shout_id: "b954d35a-de0d-42b4-a021-7f9c61ec0673",
        report_id: "0d3e2105-8b77-40c3-a079-f31bda857ae9"
      });

    console.log("props of Report", props);

    const deleteReport = (props) => {
      axios({
        method: "delete",
        url: `http://localhost:8000/comment_like_report/shoutreport/${formData.report_id}/`,
    
        headers: {
          "X-CSRFToken": csrftoken,
        },
      })
        // .then((res) => getLike(props))
        .then((response) =>console.log(response))
        .catch((error) => console.log(error));
    };

    const handleReport = () => {
        //e.preventDefault();
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
          .then((data) => console.log(data+"data"));

          setIsReported(false)
      };

      const handleRemoveReport = (props) => {
        //e.preventDefault();
        setIsReported(true);
        console.log(formData);
        deleteReport();
      };

    return (
        <div>
            <form action="" >
                <p>This is Report</p>
                  
                  {isReported ?
                (
                  <button type="button" name="Report_button" value="like" onClick={handleReport}>Report</button>
                ) : (
                  <button type="button" name="unlike_button" value="like" onClick={handleRemoveReport}>Remove Report</button>
                )
                }
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
