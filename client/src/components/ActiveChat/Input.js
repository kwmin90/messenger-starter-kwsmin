import React, { useState } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import FileUpload from "./FileUpload";

const styles = {
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
};

const Input = (props) => {
  const [text, setText] = useState("");
  const { conversation, conversationId } = props;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let read;
    if (conversation.user1 && conversation.user2) {
      read = true;
    }
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: props.otherUser.id,
      conversationId: conversationId,
      sender: conversationId ? null : props.user,
      read: read,
    };
    await props.postMessage(reqBody);
    setText("");
  };

  const { classes } = props;
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
        <FormControl>
          <FileUpload setText={setText} />
        </FormControl>
      </FormControl>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation: state.conversations.find(
      (conversation) =>
        conversation.otherUser.username === state.activeConversation
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Input));
