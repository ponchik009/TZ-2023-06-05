import React from "react";

export const useInput = (
  initial: string
): [
  string,
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  () => void
] => {
  const [value, setValue] = React.useState(initial);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValue(e.target.value),
    [setValue]
  );

  const reset = React.useCallback(() => setValue(initial), [setValue, initial]);

  return [value, onChange, reset];
};
