import React from "react";

import styles from "./ChatList.module.css";
import { ChatItem } from "../ChatItem/ChatItem";
import { useAppSelector } from "../../../hooks";
import { selectCurrentChat } from "../../../store/whatsappSlice";

interface ChatListProps {
  data: string[];
  onClick: (chat: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ data, onClick }) => {
  const currentChat = useAppSelector(selectCurrentChat);

  return (
    <ul className={styles.chatList}>
      {data.map((chat) => (
        <ChatItem
          contactName={chat}
          onClick={() => onClick(chat)}
          active={chat === currentChat}
          key={chat}
        />
      ))}
    </ul>
  );
};
