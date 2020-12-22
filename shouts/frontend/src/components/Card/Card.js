import React from "react";
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
import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
}));

function Cards({ shouts }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const avatar=shouts.username.charAt(0)
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {avatar}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={shouts.username}
        subheader={shouts.date_posted}
      />
      {/* ====================Image========================== */}
      {shouts.post_type === "I" ? (
        <CardMedia
          className={classes.media}
          image={shouts.media}
          src={shouts.media}
        />
      ) : null}
      {/* ====================Video========================== */}
      {shouts.post_type === "V" ? (
        <div>
          <ReactPlayer
            width="100%"
            height="100%"
            url={shouts.media}
            playing={true}
            controls={true}
            light={false}
            loop={true}
            volume={1}
            muted={false}
          />
        </div>
      ) : null}
      {/* ====================Audio========================== */}
      {shouts.post_type === "A" ? (
        <ReactAudioPlayer src={shouts.media} autoPlay controls />
      ) : null}
      {/* ====================Text========================== */}
      <CardContent>
        <Typography variant="body2" component="p">
          {shouts.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{shouts.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Cards;
