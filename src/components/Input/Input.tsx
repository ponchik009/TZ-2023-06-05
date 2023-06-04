import React from "react";

import styles from "./Input.module.css";
import classNames from "classnames";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Input: React.FC<InputProps> = ({ ...props }) => {
  return (
    <input {...props} className={classNames(styles.input, props.className)} />
  );
};
