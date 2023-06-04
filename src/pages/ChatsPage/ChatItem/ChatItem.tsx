import React from "react";
import classNames from "classnames";

import styles from "./ChatItem.module.css";

interface ChatItemProps {
  contactName: string;
  onClick: () => void;
  active?: boolean;
}

export const ChatItem: React.FC<ChatItemProps> = ({
  contactName,
  onClick,
  active = false,
}) => {
  return (
    <li
      key={contactName}
      onClick={onClick}
      className={classNames(styles.chatItem, {
        [styles.chatItemActive]: active,
      })}
    >
      {contactName}
    </li>
  );
};
