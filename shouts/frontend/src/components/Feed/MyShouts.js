import React, { useEffect, useRef, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Container, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import axios from "axios";
import Shout from "./Shout";
import CreateShouts from "./CreateShouts";
import { getMyPost } from "../../actions/PostActions";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  feed: {
    flex: 1,
    padding: "30px 150px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f2f5",
  },
  paper_grid: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    borderRadius: "15px",
  },
}));
function MyShouts(props) {
  const classes = useStyles();
  var user_id = "21972bf4-f2c5-4658-b08a-6378034f8ee1";
  useEffect(() => {
    console.log("myshouts");
    getMyPost(props, user_id);
  }, []);

  return (
    <>
      <Grid
        container
        spacing={1}
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item xs={12} >
          <Paper className={classes.paper_grid}>
            <CreateShouts />
          </Paper>
        </Grid>

        <Grid item xs={12} >
          <Paper className={classes.paper_grid}>
            {props.shouts.map((shout) => (
              <Shout key={shout.post_id} shouts={shout} />
            ))}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
const mapStateToProps = (state) => ({
  shouts: state.shouts,
});
export default connect(mapStateToProps)(MyShouts);
