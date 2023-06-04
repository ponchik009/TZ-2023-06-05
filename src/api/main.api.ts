import axios from "axios";
import { io } from "socket.io-client";

import { WhatsAppApi } from "./whatsapp.api";
import { API_URL, SOCKET_URL } from "../const/const";

export const apiInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket", "polling", "flashsocket"],
});

const whatsAppApi = new WhatsAppApi(apiInstance, socket);

export { whatsAppApi };
