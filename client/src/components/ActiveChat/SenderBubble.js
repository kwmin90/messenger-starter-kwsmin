import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import { checkIfImage } from "../../utils/utilFunctions";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
  },
  image: {
    width: 200,
    borderRadius: 7,
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text } = props;
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        {checkIfImage(text) ? (
          <Typography className={classes.text}>
            <img src={text} alt="" className={classes.image} />
          </Typography>
        ) : (
          <Typography className={classes.text}>{text}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default SenderBubble;
