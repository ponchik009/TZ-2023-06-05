import React from "react";

import styles from "./LeftSide.module.css";

import { ReactComponent as IconAdd } from "../../../assets/icons/IconAdd.svg";

import { ButtonWithIcon } from "../../../components";
import { ChatList } from "../ChatList/ChatList";
import { selectSession, setCurrentChat } from "../../../store/whatsappSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { CreateChatModal } from "../CreateChatModal/CreateChatModal";

export const LeftSide = () => {
  const dispatch = useAppDispatch();
  const session = useAppSelector(selectSession);

  const contacts = React.useMemo(
    () => Object.values(session).map((chat) => chat.contactName),
    [session]
  );

  const onChatClick = React.useCallback(
    (phone: string) => {
      dispatch(setCurrentChat(phone));
    },
    [dispatch, setCurrentChat]
  );

  const [createChatModalOpen, setCreateChatModalOpen] = React.useState(false);

  const onCreateChatModalOpenClick = () => {
    setCreateChatModalOpen(true);
  };

  return (
    <div className={styles.leftSide}>
      {/* TODO: Добавить модалку создания чата */}
      <ButtonWithIcon
        leftIcon={<IconAdd />}
        onClick={onCreateChatModalOpenClick}
      >
        Создать чат
      </ButtonWithIcon>
      <ChatList data={contacts} onClick={onChatClick} />
      <CreateChatModal
        open={createChatModalOpen}
        onClose={() => setCreateChatModalOpen(false)}
      />
    </div>
  );
};
