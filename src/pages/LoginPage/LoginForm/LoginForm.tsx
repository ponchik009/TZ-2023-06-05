import React, { FC, useCallback, useState } from "react";

import { Input } from "../../../components";
import { Button } from "../../../components";
import { Form } from "../../../components";

export type OnLoginSubmitDataType = {
  idInstance: string;
  apiTokenInstance: string;
};

interface LoginFormProps {
  onSumbit: (data: OnLoginSubmitDataType) => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onSumbit }) => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");

  const onIdInstanceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIdInstance(e.target.value);
    },
    [setIdInstance]
  );

  const onApiTokenInstanceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setApiTokenInstance(e.target.value);
    },
    [setApiTokenInstance]
  );

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSumbit({ idInstance, apiTokenInstance });
  };

  return (
    <Form onSubmit={onFormSubmit}>
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
      <Button>Войти</Button>
    </Form>
  );
};
