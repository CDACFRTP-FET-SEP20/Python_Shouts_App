import React, { useEffect, useState } from "react";
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
import { getLikes } from "../../actions/LikeActions";
import Cookies from "js-cookie";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ShowReport from "../ShoutReport/ShowReport";
import ShowComment from "../ShowComment/ShowComment";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "100px",
    borderRadius: "15px",
    marginTop: "20px",
    width: "80%",
    margin: "7%",
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
    textAlign: "left",
    color: "#f1f2f5",
    borderRadius: "15px",
    width: "60%",
    marginLeft: "20%",
    backgroundColor: "#f1f2f5",
    "@media (max-width: 500px)": {
      width: "70%",
      marginLeft: "10%",
    },
  },
  shout: {
    backgroundColor: "#f1f2f5",
    marginTop: "20px",
  },
}));

function Shout(props) {
  // const[myshout,setMyshouts]=useState(false)
  console.log("ShoutsNew==", props);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const username = sessionStorage.getItem("user");

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postId, setPostId] = useState("");
  const [postContent, setPostContent] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  // const [isLiked, setIsLiked] = useState(true);

  const csrftoken = Cookies.get("csrftoken");
  console.log(csrftoken);
  useEffect(() => {
    getLikes(props);
  }, []);

  const [formData, setFormData] = useState({
    user_id: props.user.user_id,
    shout_id: props.shouts.post_id,
    // like_id: props.like.id,
  });
  console.log("Like id", props.like);
  //----------------------Delete Like-------------------//
  const deleteLike = (id) => {
    axios({
      method: "delete",
      url: `http://localhost:8000/api/shoutlike/${id}/`,
      headers: {
        "X-CSRFToken": csrftoken,
      },
    })
      // .then((res) => getLike(props))
      .then((data) => getLikes(props))
      .catch((error) => console.log(error));
  };

  //---------------------------Handle Submit----------------------//
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formdata", formData);
    console.log("Likes Array===>", props.like);

    fetch("http://localhost:8000/api/shoutlike/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    })
      .then((response) => response.json())
      .then((data) => getLikes(props));
  };
  //------------------------------Handle Unlike--------------------//
  const handleUnlike = (data) => {
    for (let lk of props.like) {
      if (lk.shout_id === data.post_id && lk.user_id === props.user.user_id) {
        console.log("isLiked false");

        deleteLike(lk.id);
      }
    }
  };

  let fil = props.like.filter((c) => c.shout_id === props.shouts.post_id);
  console.log("prop-fil==", fil);
  const like_count = fil.length;

  let filtercomment = props.comments.filter(
    (c) => c.shout_id === props.shouts.post_id
  );
  const comment_count = filtercomment.length;

  const isLiked = (data) => {
    for (let lk of props.like) {
      if (lk.shout_id === data.post_id && lk.user_id === props.user.user_id) {
        console.log("isLiked false");
        return false;
      }
    }
    console.log("isLiked true");
    return true;
  };

  console.log("Like--------------->", props);

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
  let action = <div></div>;

  const profilepic = (data) => {
    for (let item1 of props.profiles) {
      if (item1.username === data.username) {
        return item1.user_image.slice(21);
      }
    }
  };

  return (
    <Grid item xs={12} className={classes.shout}>
      <Paper className={classes.paper_grid}>
        <Card className={classes.root} spacing={1} key={props.shouts.post_id}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                src={profilepic(props.shouts)}
              ></Avatar>
            }
            action={
              props.shouts.username == username ? (
                <IconButton aria-label="settings" onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
              ) : (
                <div></div>
              )
            }
            title={props.shouts.username}
            subheader={props.shouts.date_posted}
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
              {props.shouts.title}
            </Typography>
          </CardContent>
          {props.shouts.post_type === "I" ? (
            <CardMedia
              className={classes.media}
              image={props.shouts.media}
              title="Paella dish"
            />
          ) : null}
          {props.shouts.post_type === "T" ? (
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.shouts.description}
              </Typography>
            </CardContent>
          ) : null}
          {props.shouts.post_type === "A" ? (
            <CardContent>
              <div className={classes.audio}>
                <ReactAudioPlayer
                  src={props.shouts.media}
                  controls
                  style={{ width: "100%" }}
                />
              </div>
            </CardContent>
          ) : null}
          {props.shouts.post_type === "V" ? (
            <CardContent>
              <div>
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={props.shouts.media}
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
            {isLiked(props.shouts) ? (
              <>
                <IconButton
                  aria-label="add to favorites"
                  onClick={handleSubmit}
                >
                  {/* <FavoriteIcon /> */}
                  <ThumbUpIcon />
                </IconButton>
                <p>{like_count}</p>
              </>
            ) : (
              <>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => handleUnlike(props.shouts)}
                >
                  {/* <FavoriteIcon /> */}
                  <ThumbDownIcon />
                </IconButton>
                <p>{like_count}</p>
              </>
            )}
            <IconButton aria-label="comment">
              <ShowComment shouts={props.shouts} />
            </IconButton>
            <p>{comment_count}</p>
            <ShowReport shouts={props.shouts} />
          </CardActions>

          <DeleteModal
            open={modalOpen}
            handleClose={handleModalClose}
            postTitle={props.shouts.title}
            postId={props.shouts.post_id}
            myshout={props.myshouts}
          />
          <EditModal
            open={editModalOpen}
            handleClose={handleModalClose}
            postTitle={props.shouts.title}
            postContent={props.shouts.description}
            postId={props.shouts.post_id}
            media={props.shouts.media}
            post_type={props.shouts.post_type}
            myshout={props.myshouts}
          />
        </Card>
      </Paper>
    </Grid>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.login,
    like: state.like.like,
    // shouts: state.shouts,
    profiles: state.friendList.profiles,
    reports: state.report.report,
    comments: state.Comment.comments,
  };
};
export default connect(mapStateToProps)(Shout);
