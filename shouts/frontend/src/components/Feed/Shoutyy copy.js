import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "100px",
    borderRadius: "15px",
    width: "80%",
    marginLeft: "60%",
    "@media (max-width: 900px)": {
      width: "70%",
      marginLeft: "15%",
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  paper_grid: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "15px",
    width: "60%",
    marginLeft: "20%",
    "@media (max-width: 500px)": {
      width: "70%",
      marginLeft: "10%",
    },
  },
}));

function Shout({ shouts }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const username = sessionStorage.getItem("user");

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postId, setPostId] = useState("");
  const [postContent, setPostContent] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  // ===========================Menu================================
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setEditModalOpen(false);
  };
  // ===========================Delete================================
  const onDeletePost = (postTitle, postId) => {
    console.log("delete");
    setModalOpen(true);
    setPostTitle(postTitle);
    setPostId(postId);
  };
  // ===========================Edit================================
  const onEditePost = (postContent, postTitle, postId) => {
    setEditModalOpen(true);
    setPostContent(postContent);
    setPostTitle(postTitle);
    setPostId(postId);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  var action = <div></div>;
  if (shouts.username === username) {
    action = (
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
    );
  }

  return (
    <Grid item md={6}>
      <Card className={classes.root} spacing={1}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={action}
          title={shouts.username}
          subheader={shouts.date_posted}
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={(e) => {
              handleClose();
              onEditePost(postContent, postTitle, postId);
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleClose();
              onDeletePost(postTitle, postId);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
        <CardContent>
          <Typography variant="h6" color="textSecondary" component="p">
            {shouts.title}
          </Typography>
        </CardContent>
        {shouts.post_type === "I" ? (
          <CardMedia
            className={classes.media}
            image={shouts.media}
            title="Paella dish"
          />
        ) : null}
        {shouts.post_type === "T" ? (
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {shouts.description}
            </Typography>
          </CardContent>
        ) : null}
        {shouts.post_type === "A" ? (
          <CardContent>
            <div className={classes.audio}>
              <ReactAudioPlayer
                src={shouts.media}
                controls
                style={{ width: "100%" }}
              />
            </div>
          </CardContent>
        ) : null}
        {shouts.post_type === "V" ? (
          <CardContent>
            <div>
              <ReactPlayer
                width="100%"
                height="100%"
                url={shouts.media}
                playing={true}
                controls={true}
                light={false}
                loop={true}
                volume={0}
                muted={false}
              />
            </div>
          </CardContent>
        ) : null}
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="comment">
            <ChatBubbleIcon />
          </IconButton>
        </CardActions>
        <DeleteModal
          open={modalOpen}
          handleClose={handleModalClose}
          postTitle={shouts.title}
          postId={shouts.post_id}
        />
        <EditModal
          open={editModalOpen}
          handleClose={handleModalClose}
          postTitle={shouts.title}
          postContent={shouts.description}
          postId={shouts.post_id}
          media={shouts.media}
          post_type={shouts.post_type}
        />
      </Card>
    </Grid>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.login,
  };
};
export default connect(mapStateToProps)(Shout);