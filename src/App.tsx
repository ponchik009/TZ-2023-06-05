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
import { RouterProvider } from "react-router-dom";
import { router } from "./components";

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

  return <RouterProvider router={router} />;
}

export default App;
