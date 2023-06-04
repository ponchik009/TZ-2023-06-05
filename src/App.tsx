import React, { useEffect, useState } from "react";

import "./App.css";

import { socket } from "./api";
import { SessionType } from "./types";
import {
  createChat,
  joinToSession,
  selectCredentials,
  selectCurrentChat,
  selectSession,
  sendMessage,
  setSession,
  setSettings,
} from "./store/whatsappSlice";
import { useAppDispatch, useAppSelector } from "./hooks/storeHooks";

function App() {
  const dispatch = useAppDispatch();

  const { idInstance, apiTokenInstance } = useAppSelector(selectCredentials);
  const session = useAppSelector(selectSession);
  const currentChat = useAppSelector(selectCurrentChat);

  const [idInstanceInput, setIdInstanceInput] = useState("");
  const [apiTokenInstanceInput, setApiTokenInstanceInput] = useState("");

  const setCredentials = () => {
    dispatch(
      setSettings({
        idInstance: idInstanceInput,
        apiTokenInstance: apiTokenInstanceInput,
      })
    );
  };

  useEffect(() => {
    if (idInstance) {
      dispatch(joinToSession(idInstance));
      console.log("joined");
    }
  }, [idInstance]);

  const [phoneInput, setPhoneInput] = useState("");

  const createChatClick = () => {
    dispatch(createChat({ idInstance: idInstance!, phone: phoneInput }));
  };

  const [message, setMessage] = useState("");

  const sendMessageClick = () => {
    dispatch(
      sendMessage({
        credentials: {
          idInstance: idInstance!,
          apiTokenInstance: apiTokenInstance!,
        },
        data: {
          phone: currentChat!,
          text: message,
        },
      })
    );
  };

  useEffect(() => {
    socket.on("update", (data: SessionType) => {
      dispatch(setSession(data));
    });
  }, []);

  return (
    <div className="App">
      <span>1101826888</span>
      <span>3154111f359e4e5b8ea48b32eb99c5a9d2b532566dad4d19ad</span>
      <span>79642733069</span>
      <input
        type="text"
        placeholder="idInstance"
        value={idInstanceInput}
        onChange={(e) => setIdInstanceInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="apiTokenInstance"
        value={apiTokenInstanceInput}
        onChange={(e) => setApiTokenInstanceInput(e.target.value)}
      />
      <button onClick={setCredentials}>SET CREDENTIALS</button>

      <input
        type="text"
        placeholder="phone"
        value={phoneInput}
        onChange={(e) => setPhoneInput(e.target.value)}
      />
      <button onClick={createChatClick}>CREATE CHAT</button>
      <div>current chat: {currentChat}</div>

      <input
        type="text"
        placeholder="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessageClick}>SEND MESSAGE</button>

      <div>Session:</div>
      {Object.entries(session).map(([phone, chat]) => {
        return (
          <div>
            {chat.contactName}
            <ul>
              {chat.messages.map((m) => (
                <li>{m.text}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default App;
