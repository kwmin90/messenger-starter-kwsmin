import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setConnectedUser,
  setMessageStatus,
} from "./store/conversations";

const token = localStorage.getItem("messenger-token");
const socket = io(window.location.origin, {
  extraHeaders: { Authorization: `Bearer ${token}` },
});

socket.on("connect", () => {
  console.log("connected to server");
  console.log(socket.id);
  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });
  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
  });
  socket.on("connected-user", (data) => {
    store.dispatch(setConnectedUser(data.convId, data.user));
    store.dispatch(setMessageStatus(data.convId));
  });
  socket.on("connect_error", () => {
    console.log("connection failed");
  });
});

export default socket;
