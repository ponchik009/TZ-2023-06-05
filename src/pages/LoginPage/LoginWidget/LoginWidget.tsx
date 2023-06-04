import React, { useEffect } from "react";

import styles from "./LoginWidget.module.css";

import { LoginForm, OnLoginSubmitDataType } from "../LoginForm/LoginForm";
import { useAppDispatch } from "../../../hooks/storeHooks";
import { setSettings } from "../../../store/whatsappSlice";

export const LoginWidget = () => {
  const dispatch = useAppDispatch();

  const onLoginFormSubmit = (data: OnLoginSubmitDataType) => {
    dispatch(setSettings(data));
  };

  return (
    <div className={styles.authBlock}>
      <h3 className={styles.authTitle}>Авторизация</h3>
      <LoginForm onSumbit={onLoginFormSubmit} />
    </div>
  );
};
