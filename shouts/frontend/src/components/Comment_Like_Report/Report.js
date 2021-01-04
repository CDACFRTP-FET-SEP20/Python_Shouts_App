import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import ReportIcon from "@material-ui/icons/Report";
import ReportOffIcon from "@material-ui/icons/ReportOff";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

function Report(props) {
  const [isReported, setIsReported] = useState(true);
  const [postReport, setPostReport] = useState("");

  const csrftoken = Cookies.get("csrftoken");
  console.log(csrftoken);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [formData, setFormData] = useState({
    user_id: "35213582-5d83-4ee0-b71c-6da160198cf9",
    shout_id: "b954d35a-de0d-42b4-a021-7f9c61ec0673",
    report_type: postReport,
    report_id: "01bb2810-0f96-455b-92c3-c778cd02da23",
  });

  console.log("props of Report", props);

  //----------------------Delete Report----------------------//
  const deleteReport = (props) => {
    axios({
      method: "delete",
      url: `http://localhost:8000/comment_like_report/shoutreport/${formData.report_id}/`,

      headers: {
        "X-CSRFToken": csrftoken,
      },
    })
      // .then((res) => getLike(props))
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  //-------------------------------HandleClick----------------------------//

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReport = (event) => {
    //e.preventDefault();
    console.log("formdata", formData);
    setAnchorEl(null);
    setPostReport(event.target.innerText);
    console.log("this is inner text", event.target.innerText);
    console.log("Post Report", postReport);

    fetch("http://localhost:8000/comment_like_report/shoutreport/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      data: {
        shout_id: "cbfd8946-7d45-4952-b95b-74922fd08a50",
        user_id: "35213582-5d83-4ee0-b71c-6da160198cf9",
        report_type: postReport,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data + "data"));

    setIsReported(false);
  };

  const handleRemoveReport = (props) => {
    //e.preventDefault();
    setIsReported(true);
    console.log(formData);
    deleteReport();
  };

  const handleChange = (event) => {
    setPostReport(event.target.innerText);
  };

  return (
    <div>
      <form action="">
        {isReported ? (
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              Report Type
            </Button>
            <Menu
              id="simple-menu"
              // report={report}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleReport}
                onChange={handleChange}
                value={postReport}
              >
                Abuse and Spam
              </MenuItem>
              <MenuItem onClick={handleReport} value={postReport}>
                Exploitation
              </MenuItem>
              <MenuItem onClick={handleReport} value={postReport}>
                Underage Children
              </MenuItem>
              <MenuItem onClick={handleReport} value={postReport}>
                Other types of Reports
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button
            type="button"
            name="unlike_button"
            value="like"
            onClick={handleRemoveReport}
          >
            <ReportOffIcon /> Remove Report
          </Button>
        )}

        {/* {isReported ? (
          <button
            type="button"
            name="Report_button"
            value="like"
            onClick={handleReport}
          >
            <ReportIcon /> Report
          </button>
        ) : (
          <button
            type="button"
            name="unlike_button"
            value="like"
            onClick={handleRemoveReport}
          >
            <ReportOffIcon /> Remove Report
          </button>
        )} */}
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    report: state.report,
  };
};

export default connect(mapStateToProps)(Report);
