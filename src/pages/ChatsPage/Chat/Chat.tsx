import React from "react";

import styles from "./Chat.module.css";

import { MessageType } from "../../../types";
import classNames from "classnames";

interface ChatProps {
  messages: MessageType[];
}

export const Chat: React.FC<ChatProps> = ({ messages }) => {
  return (
    <ul className={styles.chat}>
      {messages.map((m, i) => (
        <li
          key={i}
          className={classNames(styles.message, {
            [styles.fromMe]: m.my,
          })}
        >
          {m.text}
        </li>
      ))}
    </ul>
  );
};
