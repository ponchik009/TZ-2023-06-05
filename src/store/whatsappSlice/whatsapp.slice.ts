import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

import { CredentialsType, SendMessageDto, SessionType } from "@/types";
import { whatsAppApi } from "../../api";

export interface WhatsappState {
  idInstance: string | null;
  apiTokenInstance: string | null;

  status: "loading" | "idle" | "failed";
  errorMessage: string | null;

  session: SessionType;

  currentChat: string | null;
}

const initialState: WhatsappState = {
  idInstance: null,
  apiTokenInstance: null,

  status: "idle",
  errorMessage: null,

  session: {},

  currentChat: null,
};

export const setSettings = createAsyncThunk(
  "whatsapp/setSettings",
  async (credentials: CredentialsType) => {
    await whatsAppApi.setSettings(credentials);
    return credentials;
  }
);

export const joinToSession = createAsyncThunk(
  "whatsapp/joinToSession",
  async (idInstance: string) => {
    await whatsAppApi.join(idInstance);
    return idInstance;
  }
);

export const createChat = createAsyncThunk(
  "whatsapp/createChat",
  async (data: { idInstance: string; phone: string }) => {
    await whatsAppApi.createChat(data.idInstance, data.phone);
    return data;
  }
);

export const sendMessage = createAsyncThunk(
  "whatsapp/sendMessage",
  async (data: { credentials: CredentialsType; data: SendMessageDto }) => {
    await whatsAppApi.sendMessage(data.credentials, data.data);
    return data;
  }
);

export const whatsappSlice = createSlice({
  name: "whatsapp",
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<SessionType>) {
      state.session = action.payload;
    },
    setCurrentChat(state, action: PayloadAction<string>) {
      state.currentChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setSettings.pending, (state) => {
        state.status = "loading";

        state.errorMessage = null;
      })
      .addCase(setSettings.fulfilled, (state, action) => {
        state.status = "idle";

        state.idInstance = action.payload.idInstance;
        state.apiTokenInstance = action.payload.apiTokenInstance;

        state.errorMessage = null;
      })
      .addCase(setSettings.rejected, (state) => {
        state.status = "failed";
        state.errorMessage = "Не удалось изменить настройки аккаунта";
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.currentChat = action.payload.phone;
      });
  },
});

export const { setSession, setCurrentChat } = whatsappSlice.actions;

export const selectCredentials = (state: RootState) => ({
  idInstance: state.whatsapp.idInstance,
  apiTokenInstance: state.whatsapp.apiTokenInstance,
});

export const selectSession = (state: RootState) => state.whatsapp.session;

export const selectFetchInfo = (state: RootState) => ({
  status: state.whatsapp.status,
  errorMessage: state.whatsapp.errorMessage,
});

export const selectCurrentChat = (state: RootState) =>
  state.whatsapp.currentChat;

export default whatsappSlice.reducer;
