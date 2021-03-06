import { checkIfImage } from "../../utils/utilFunctions";

export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      const { messages, otherUser, user1, user2 } = convoCopy;
      messages.push(message);
      if (checkIfImage(message.text)) {
        convoCopy.latestMessageText = "[Image]";
      } else {
        convoCopy.latestMessageText = message.text;
      }
      if (messages[messages.length - 1].senderId === otherUser.id) {
        if (!user1 || !user2) {
          convoCopy.unreadMessages++;
        }
      }
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addMessageStatusToStore = (state, payload) => {
  const { convId } = payload;
  return state.map((convo) => {
    if (convo.id === convId) {
      const convoCopy = { ...convo };
      convoCopy.messages.forEach((message) => {
        if (message.senderId !== convoCopy.otherUser.id) {
          message.read = true;
        }
      });
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addUnreadMessagesToStore = (state, payload) => {
  const { convId } = payload;
  return state.map((convo) => {
    if (convo.id === convId) {
      const convoCopy = { ...convo };
      convoCopy.unreadMessages = "";
      return convoCopy;
    }
    return convo;
  });
};
export const addConnectedUserToStore = (state, payload) => {
  const { convId, user } = payload;
  return state.map((convo) => {
    if (convo.id === convId) {
      const convoCopy = { ...convo };
      if (!convoCopy.user1) {
        convoCopy.user1 = user;
      } else if (convoCopy.user1 === user) {
        convoCopy.user1 = user;
      } else {
        convoCopy.user2 = user;
      }
      return convoCopy;
    } else {
      const convoCopy = { ...convo };
      if (convoCopy.user1 === user) {
        convoCopy.user1 = null;
      } else {
        convoCopy.user2 = null;
      }
      return convoCopy;
    }
  });
};
export const removeConnectedUserFromStore = (state, payload) => {
  const { convId, user } = payload;
  return state.map((convo) => {
    if (convo.id === convId) {
      const convoCopy = { ...convo };
      if (convoCopy.user1 === user) {
        convoCopy.user1 = null;
      } else if (convoCopy.user2 === user) {
        convoCopy.user2 = null;
      }
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [], unreadMessages: "" };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      if (checkIfImage(message.text)) {
        newConvo.latestMessageText = "[Image]";
      } else {
        newConvo.latestMessageText = message.text;
      }
      return newConvo;
    } else {
      return convo;
    }
  });
};
