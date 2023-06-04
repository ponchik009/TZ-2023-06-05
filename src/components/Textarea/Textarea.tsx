import React from "react";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";

import styles from "./Textarea.module.css";

interface TextaeraProps extends TextareaAutosizeProps {}

export const Textarea: React.FC<TextaeraProps> = ({ ...props }) => {
  return <TextareaAutosize {...props} className={styles.textarea} />;
};
