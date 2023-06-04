import React from "react";

import { ReactComponent as IconSend } from "../../../assets/icons/IconSend.svg";

import { ButtonWithIcon, Form, FormProps, Textarea } from "../../../components";
import { useInput } from "../../../hooks";

import styles from "./MessageForm.module.css";

export type OnMessageSubmitDataType = {
  message: string;
};

interface MessageFormProps extends FormProps {
  onMessageFormSubmit: (data: OnMessageSubmitDataType) => void;
}

export const MessageForm: React.FC<MessageFormProps> = ({
  onMessageFormSubmit,
  ...props
}) => {
  const [message, onMessageChange, resetMessage] = useInput("");

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onMessageFormSubmit({ message });
    resetMessage();
  };

  return (
    <Form
      {...props}
      onSubmit={onFormSubmit}
      className={styles.messageForm}
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "8px",
        alignItems: "end",
        width: "100%",
      }}
    >
      <Textarea
        value={message}
        onChange={onMessageChange}
        minRows={1}
        maxRows={5}
        style={{ width: "100%" }}
        placeholder="Введите сообщение..."
      />
      <ButtonWithIcon rightIcon={<IconSend />} />
    </Form>
  );
};
