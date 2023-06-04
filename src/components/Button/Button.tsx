import React from "react";

import styles from "./Button.module.css";
import classNames from "classnames";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export const Button: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <button {...props} className={classNames(styles.button, props.className)}>
      {props.children}
    </button>
  );
};
