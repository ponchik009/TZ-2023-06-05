import React from "react";

import styles from "./LoginPage.module.css";

import { LoginWidget } from "./LoginWidget/LoginWidget";

export const LoginPage = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}></header>
      <main className={styles.main}>
        <h2 className={styles.greeting}>Добро пожаловать в приложение!</h2>
        <LoginWidget />
      </main>
      <footer className={styles.footer} />
    </div>
  );
};
