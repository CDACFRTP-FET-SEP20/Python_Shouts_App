import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  cardFlex: {
    display: "flex",
    fontSize: 24,
  },
 
}));

export default useStyles;
