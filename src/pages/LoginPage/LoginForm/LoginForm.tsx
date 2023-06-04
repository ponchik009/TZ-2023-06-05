import React, { FC, useCallback, useState } from "react";

import { FormProps, Input, Button, Form } from "../../../components";
import { useInput } from "../../../hooks";

export type OnLoginSubmitDataType = {
  idInstance: string;
  apiTokenInstance: string;
};

interface LoginFormProps extends FormProps {
  onLoginFormSubmit: (data: OnLoginSubmitDataType) => void;
}

export const LoginForm: FC<LoginFormProps> = ({
  onLoginFormSubmit,
  ...props
}) => {
  const [idInstance, onIdInstanceChange] = useInput("");
  const [apiTokenInstance, onApiTokenInstanceChange] = useInput("");

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onLoginFormSubmit({ idInstance, apiTokenInstance });
  };

  return (
    <Form onSubmit={onFormSubmit} {...props}>
      <Input
        type="text"
        placeholder="id instance"
        name="idInstance"
        value={idInstance}
        onChange={onIdInstanceChange}
      />
      <Input
        type="text"
        placeholder="api token instance"
        name="apiTokenInstance"
        value={apiTokenInstance}
        onChange={onApiTokenInstanceChange}
      />
      <Button type="submit">Войти</Button>
    </Form>
  );
};
