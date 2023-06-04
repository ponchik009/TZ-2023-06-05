import React from "react";

import styles from "./ButtonWithIcon.module.css";

import { ButtonProps } from "../Button";
import { Button } from "../Button/Button";

interface ButtonWithIconProps extends ButtonProps {
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
}

export const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <Button {...props} className={styles.buttonWithIcon}>
      {leftIcon}
      {props.children}
      {rightIcon}
    </Button>
  );
};
