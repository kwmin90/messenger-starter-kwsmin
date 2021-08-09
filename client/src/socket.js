import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setConnectedUser,
  setMessageStatus,
  removeConnectedUser,
} from "./store/conversations";

class Socket {
  constructor() {
    this.token = localStorage.getItem("messenger-token");
    this.socket = io(window.location.origin, {
      extraHeaders: { Authorization: `Bearer ${this.token}` },
      forceNew: true,
    });
    this.socket.on("connect", () => {
      console.log("connected to server");
      this.socket.on("add-online-user", (id) => {
        store.dispatch(addOnlineUser(id));
      });
      this.socket.on("remove-offline-user", (id) => {
        store.dispatch(removeOfflineUser(id));
      });
      this.socket.on("new-message", (data) => {
        store.dispatch(setNewMessage(data.message, data.sender));
      });
      this.socket.on("connected-user", (data) => {
        store.dispatch(setConnectedUser(data.convId, data.user));
        store.dispatch(setMessageStatus(data.convId));
      });
      this.socket.on("disconnect-user", (data) => {
        store.dispatch(removeConnectedUser(data.convId, data.user));
      });
    });
  }
  setToken(token) {
    this.token = token;
  }
}

export default Socket;
