import React, { useState } from 'react'
import List from '../Comment_Like_Report/List'
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import Modal from "@material-ui/core/Modal";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
      
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
//       border: '2px solid #000',
      borderRadius:"15px",
      outline:0,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function ShowComment(){

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <List />
    </div>
);
   const [showComponent, setShowComponent] = useState(false)
 
    const _onButtonClick=()=>{
      setShowComponent(true)
    }
    
      return (
        <div>
          {/* <button type="button" onClick={handleOpen}>
          <CommentRoundedIcon />Comments
          </button> */}
          <Button type="button" onClick={handleOpen}>
          <CommentRoundedIcon /> Comments
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
          {/* {showComponent ?
            <List /> :
            <button onClick={_onButtonClick}><CommentRoundedIcon />Comments</button>
          } */}
        </div>
      );
    
}
    
export default ShowComment