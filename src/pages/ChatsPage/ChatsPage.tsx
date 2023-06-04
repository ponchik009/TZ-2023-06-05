import React from "react";

import styles from "./ChatsPage.module.css";

import { MessageForm } from "./MessageForm/MessageForm";
import { LeftSide } from "./LeftSide/LeftSide";
import { RightSide } from "./RightSide/RightSide";

export const ChatsPage = () => {
  return (
    <div className={styles.chatsPage}>
      <LeftSide />
      <RightSide />
    </div>
  );
};
