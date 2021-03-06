import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Typography } from "@material-ui/core";
import { checkIfImage } from "../../utils/utilFunctions";
import { connect } from "react-redux";

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
    minHeight: 200,
    maxHeight: 300,
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
          <Avatar
            alt={props.user.username}
            src={text}
            className={classes.image}
          ></Avatar>
        ) : (
          <Typography className={classes.text}>{text}</Typography>
        )}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(SenderBubble);
