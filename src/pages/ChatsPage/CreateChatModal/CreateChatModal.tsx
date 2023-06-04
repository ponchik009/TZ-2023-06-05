import React from "react";

import Modal from "../../../components/Modal/Modal";
import {
  CreateChatForm,
  OnCreateChatSubmitDataType,
} from "../CreateChatForm/CreateChatForm";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { createChat, selectCredentials } from "../../../store/whatsappSlice";

interface CreateChatModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateChatModal: React.FC<CreateChatModalProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { idInstance } = useAppSelector(selectCredentials);

  const onCreateChatFormSubmit: (data: OnCreateChatSubmitDataType) => void = ({
    phone,
  }) => {
    dispatch(createChat({ idInstance: idInstance!, phone }));
    onClose();
  };

  return (
    <Modal title="Создание чата" open={open} onClose={onClose}>
      <CreateChatForm onCreateChatFormSubmit={onCreateChatFormSubmit} />
    </Modal>
  );
};
