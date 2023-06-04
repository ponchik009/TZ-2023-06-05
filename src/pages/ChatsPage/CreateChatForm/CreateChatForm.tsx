import React from "react";

import { ReactComponent as IconAdd } from "../../../assets/icons/IconAdd.svg";

import {
  ButtonWithIcon,
  Form,
  FormProps,
  Input,
  Textarea,
} from "../../../components";
import { useInput } from "../../../hooks";

export type OnCreateChatSubmitDataType = {
  phone: string;
};

interface CreateChatFormProps extends FormProps {
  onCreateChatFormSubmit: (data: OnCreateChatSubmitDataType) => void;
}

export const CreateChatForm: React.FC<CreateChatFormProps> = ({
  onCreateChatFormSubmit,
  ...props
}) => {
  const [phone, onPhoneChange] = useInput("");

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onCreateChatFormSubmit({ phone });
  };

  return (
    <Form {...props} onSubmit={onFormSubmit}>
      <Input
        type="text"
        name="phone"
        value={phone}
        onChange={onPhoneChange}
        placeholder="Введите номер (7..)"
      />
      <ButtonWithIcon rightIcon={<IconAdd />}>Создать</ButtonWithIcon>
    </Form>
  );
};
