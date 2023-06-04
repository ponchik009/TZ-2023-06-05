import { AxiosInstance } from "axios";
import { Socket } from "socket.io-client";

import {
  CredentialsType,
  SaveSettingsResponseDto,
  SendMessageDto,
} from "../types";
import { WEBHOOK_URL } from "../const/const";

export class WhatsAppApi {
  private instance: AxiosInstance;
  private socketInstance: Socket;

  constructor(instanse: AxiosInstance, socketInstance: Socket) {
    this.instance = instanse;
    this.socketInstance = socketInstance;
  }

  async join(idInstance: string) {
    this.socketInstance.emit("join", {
      idInstance,
    });
  }

  async createChat(idInstance: string, phone: string) {
    this.socketInstance.emit("createChat", {
      idInstance,
      phone,
    });
  }

  async sendMessage(credentials: CredentialsType, data: SendMessageDto) {
    this.socketInstance.emit("sendMessage", {
      ...credentials,
      chatId: `${data.phone}@c.us`,
      message: data.text,
    });
  }

  async setSettings(credentials: CredentialsType) {
    return this.instance.post<SaveSettingsResponseDto>(
      `waInstance${credentials.idInstance}/setSettings/${credentials.apiTokenInstance}`,
      {
        webhookUrl: WEBHOOK_URL,
        webhookUrlToken: "",
        outgoingWebhook: "yes",
        stateWebhook: "yes",
        incomingWebhook: "yes",
        deviceWebhook: "no",
      }
    );
  }
}
