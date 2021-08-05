import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  previewWithBoldedText: {
    fontSize: 12,
    letterSpacing: -0.17,
    fontWeight: "bold",
  },
  unreadStyles: {
    fontWeight: 600,
    color: "white",
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "50%",
    height: "21px",
    minWidth: "20px",
    display: "flex",
    justifyContent: "center",
    padding: "0 4px 0 4px",
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { latestMessageText, otherUser, unreadMessages } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        {unreadMessages ? (
          <Typography className={classes.previewWithBoldedText}>
            {latestMessageText}
          </Typography>
        ) : (
          <Typography className={classes.previewText}>
            {latestMessageText}
          </Typography>
        )}
      </Box>
      {unreadMessages !== "" && (
        <Box className={classes.unreadStyles}>
          <span>{unreadMessages}</span>
        </Box>
      )}
    </Box>
  );
};

export default ChatContent;
