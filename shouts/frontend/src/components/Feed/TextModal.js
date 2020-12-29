import React from 'react'
import { Avatar, makeStyles, Modal, TextField } from "@material-ui/core";
function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  const useStyles = makeStyles((theme) => ({
    create__card: {
      display: "flex",
      marginTop: "30px",
      flexDirection: "column",
      backgroundColor: "white",
      borderRadius: "15px",
      boxShadow: "0px 5px 7px -7px rgba(0,0,0,0.75)",
      width: "100%",
    },
    create__top: {
      display: "flex",
      borderBottom: "1px solid #eff2f5",
      padding: "15px",
      justifyContent: "flex-start",
  
      "& form": {
        flex: 1,
        display: "flex",
        justifyContent: "flex-start",
        "& input": {
          outlineWidth: 0,
          border: "none",
          padding: "5px 20px",
          margin: "0 10px",
          borderRadius: "999px",
          backgroundColor: "#eff2f5",
          width: "100%",
        },
      },
    },
    create__bottom: {
      display: "flex",
      justifyContent: "space-evenly",
    },
    create__option: {
      padding: "20px",
      display: "flex",
      alignItems: "center",
      color: "gray",
      margin: "5px",
      "& h3": {
        fontSize: "medium",
        marginLeft: "10px",
      },
      "&:hover": {
        backgroundColor: "#eff2f5",
        cursor: "pointer",
      },
    },
    textModalContainer: {
      width: "500px",
      position: "relative",
      display: "flex",
      height: "300px",
      flexDirection: "column",
    },
    textmodalHeading: {
      display: "flex",
      boxSizing: "border-box",
      justifyContent: "center",
      alignItems: "center",
      height: "60px",
      borderBottom: "1px solid #eff2f5",
    },
    textmodaltextArea: {
      position: "absolute",
      top: "130px",
      height: "100px",
      width: "300px",
    },
    postButton: {
      backgroundColor: "blue",
      position: "absolute",
      top: "250px",
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      borderRadius: "15px",
      boxShadow: "0px 5px 7px -7px rgba(0,0,0,0.75)",
  
      padding: theme.spacing(2, 4, 3),
      outline: 0,
    },
  }));
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
function TextModal(props) {
    const classes=useStyles();
    return (
        <div>
<Modal
        aria-labelledby="title"
        aria-describedby="description"
        open={props.open}
        onClose={props.onClose}
      >
<div style={getModalStyle} className={classes.paper}>
          <div className={classes.textModalContainer}>
            {/* =============Heading=================== */}
            <div className={classes.textmodalHeading}>
              <h2>Create post</h2>
            </div>
            {/* ==============Title================== */}
            <div>
              <Avatar/>

              <span>
                <p>Amy Santiago</p>
              </span>

              <form onSubmit={handleSubmit}>
                <TextField
                  required
                  label="Title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                  fullWidth={true}
                />
                {/* ==========Content=============== */}
                <TextField
                  required
                  name="description"
                  label="description"
                  multiline={true}
                  rowsMax="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  margin="normal"
                  fullWidth={true}
                />

                {/* ==================Post Button========== */}
                <div className={classes.postButton}>
                  <Button
                    type="submit"
                    onClick={() => {
                      setMedia("");
                    }}
                  >
                    Post
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
        </div>
    )
}

export default TextModal

