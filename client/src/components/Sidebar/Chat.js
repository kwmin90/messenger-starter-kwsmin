import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import {
  editReadStatus,
  fetchConversations,
} from "../../store/utils/thunkCreators";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
};

const Chat = (props) => {
  const { classes } = props;
  const { otherUser, unreadMessages } = props.conversation;
  const [unread, setUnread] = useState("");

  useEffect(() => {
    if (unreadMessages === 0 || unreadMessages === undefined) setUnread("");
    else setUnread(`${unreadMessages}`);
  }, [unreadMessages]);

  const handleClick = async (conversation) => {
    if (conversation.id) {
      await editReadStatus(conversation);
      await props.fetchConversations();
      setUnread("");
    }
    await props.setActiveChat(conversation.otherUser.username);
  };

  return (
    <Box
      onClick={() => handleClick(props.conversation)}
      className={classes.root}
    >
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={props.conversation} unread={unread} />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    fetchConversations: () => {
      dispatch(fetchConversations());
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
