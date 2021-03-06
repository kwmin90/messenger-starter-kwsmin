import {
  addNewConvoToStore,
  addOnlineUserToStore,
  addSearchedUsersToStore,
  removeOfflineUserFromStore,
  addMessageToStore,
  addMessageStatusToStore,
  addConnectedUserToStore,
  addUnreadMessagesToStore,
  removeConnectedUserFromStore,
} from "./utils/reducerFunctions";

// ACTIONS

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const SET_MESSAGE = "SET_MESSAGE";
const SET_MESSAGE_STATUS = "SET_MESSAGE_STATUS";
const SET_UNREAD_MESSAGES = "SET_UNREAD_MESSAGES";
const SET_CONNECTED_USER = "SET_CONNECTED_USER";
const REMOVE_CONNECTED_USER = "REMOVE_CONNECTED_USER";
const ADD_ONLINE_USER = "ADD_ONLINE_USER";
const REMOVE_OFFLINE_USER = "REMOVE_OFFLINE_USER";
const SET_SEARCHED_USERS = "SET_SEARCHED_USERS";
const CLEAR_SEARCHED_USERS = "CLEAR_SEARCHED_USERS";
const ADD_CONVERSATION = "ADD_CONVERSATION";

// ACTION CREATORS

export const gotConversations = (conversations) => {
  return {
    type: GET_CONVERSATIONS,
    conversations,
  };
};

export const setNewMessage = (message, sender) => {
  return {
    type: SET_MESSAGE,
    payload: { message, sender: sender || null },
  };
};

export const setMessageStatus = (convId) => {
  return {
    type: SET_MESSAGE_STATUS,
    payload: { convId },
  };
};

export const setUnreadMessages = (convId) => {
  return {
    type: SET_UNREAD_MESSAGES,
    payload: { convId },
  };
};

export const setConnectedUser = (convId, user) => {
  return {
    type: SET_CONNECTED_USER,
    payload: { convId, user },
  };
};

export const removeConnectedUser = (convId, user) => {
  return {
    type: REMOVE_CONNECTED_USER,
    payload: { convId, user },
  };
};

export const addOnlineUser = (id) => {
  return {
    type: ADD_ONLINE_USER,
    id,
  };
};

export const removeOfflineUser = (id) => {
  return {
    type: REMOVE_OFFLINE_USER,
    id,
  };
};

export const setSearchedUsers = (users) => {
  return {
    type: SET_SEARCHED_USERS,
    users,
  };
};

export const clearSearchedUsers = () => {
  return {
    type: CLEAR_SEARCHED_USERS,
  };
};

// add new conversation when sending a new message
export const addConversation = (recipientId, newMessage) => {
  return {
    type: ADD_CONVERSATION,
    payload: { recipientId, newMessage },
  };
};

// REDUCER

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.conversations;
    case SET_MESSAGE:
      return addMessageToStore(state, action.payload);
    case SET_MESSAGE_STATUS:
      return addMessageStatusToStore(state, action.payload);
    case SET_UNREAD_MESSAGES:
      return addUnreadMessagesToStore(state, action.payload);
    case SET_CONNECTED_USER:
      return addConnectedUserToStore(state, action.payload);
    case REMOVE_CONNECTED_USER:
      return removeConnectedUserFromStore(state, action.payload);
    case ADD_ONLINE_USER: {
      return addOnlineUserToStore(state, action.id);
    }
    case REMOVE_OFFLINE_USER: {
      return removeOfflineUserFromStore(state, action.id);
    }
    case SET_SEARCHED_USERS:
      return addSearchedUsersToStore(state, action.users);
    case CLEAR_SEARCHED_USERS:
      return state.filter((convo) => convo.id);
    case ADD_CONVERSATION:
      return addNewConvoToStore(
        state,
        action.payload.recipientId,
        action.payload.newMessage
      );
    default:
      return state;
  }
};

export default reducer;
