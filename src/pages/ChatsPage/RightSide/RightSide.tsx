import React from "react";

import styles from "./RightSide.module.css";

import { Chat } from "../Chat/Chat";
import {
  MessageForm,
  OnMessageSubmitDataType,
} from "../MessageForm/MessageForm";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  selectCredentials,
  selectCurrentChat,
  selectSession,
  sendMessage,
} from "../../../store/whatsappSlice";

export const RightSide = () => {
  const dispatch = useAppDispatch();
  const { apiTokenInstance, idInstance } = useAppSelector(selectCredentials);
  const session = useAppSelector(selectSession);
  const currentChat = useAppSelector(selectCurrentChat);

  const messages = React.useMemo(() => {
    return currentChat ? session[currentChat]?.messages : null;
  }, [session, currentChat]);

  const onMessageFormSubmit: (data: OnMessageSubmitDataType) => void = ({
    message,
  }) => {
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

  return (
    <div className={styles.rightSide}>
      {messages ? (
        <>
          <Chat messages={messages} />
          <MessageForm onMessageFormSubmit={onMessageFormSubmit} />
        </>
      ) : (
        <h2 style={{ color: "#fff" }}>Создайте чат, чтобы начать общаться!</h2>
      )}
    </div>
  );
};
