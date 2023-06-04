export type SendMessageDto = {
  phone: string;
  text: string;
};

export type SaveSettingsResponseDto = {
  saveSettings: boolean;
};

export type SessionType = {
  [phone: string]: {
    contactName: string;
    messages: Array<MessageType>;
  };
};

type MessageType = {
  my: boolean;
  text: string;
};
