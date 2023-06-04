import React from "react";
import classNames from "classnames";

import styles from "./Form.module.css";

export interface FormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {}

export const Form: React.FC<FormProps> = ({ ...props }) => {
  return (
    <form {...props} className={classNames(styles.form, props.className)}>
      {props.children}
    </form>
  );
};
