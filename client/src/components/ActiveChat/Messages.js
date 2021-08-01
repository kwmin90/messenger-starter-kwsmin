import React, { useEffect, useState } from "react";
import { Box, Avatar } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  avatar: {
    height: 22,
    width: 22,
    marginRight: 1,
    marginTop: 1,
    marginBottom: 6,
  },
}));
const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const [lastRead, setLastRead] = useState();
  const classes = useStyles();

  const formatTime = (time) => {
    return moment(time).format("h:mm");
  };
  useEffect(() => {
    let index;
    let length = props.messages.length;
    for (let i = 0; i < length; i++) {
      if (props.messages[i].senderId === props.userId) {
        if (props.messages[i].read) {
          index = props.messages[i].id;
        }
      }
    }
    setLastRead(index);
  }, [props]);
  return (
    <Box>
      {messages.map((message) =>
        message.senderId === userId ? (
          message.id === lastRead ? (
            <div key={message.id} className={classes.root}>
              <SenderBubble
                text={message.text}
                time={formatTime(message.createdAt)}
                status={message.read}
              />
              <Avatar
                alt={otherUser.username}
                src={otherUser.photoUrl}
                className={classes.avatar}
              ></Avatar>
            </div>
          ) : (
            <SenderBubble
              key={message.id}
              text={message.text}
              time={formatTime(message.createdAt)}
              status={message.read}
            />
          )
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={formatTime(message.createdAt)}
            otherUser={otherUser}
          />
        )
      )}
    </Box>
  );
};
export default Messages;
