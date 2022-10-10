import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseLogin } from "../../utils/api/types";
import { RootState } from "../store";
import { HYDRATE } from "next-redux-wrapper";
import { stat } from "fs";

export interface UserState {
  data: ResponseLogin | null;
}

const initialState: UserState = {
  data: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<ResponseLogin>) => {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.data = action.payload.user.data;
    },
  },
});

export const { setUserData } = userSlice.actions;
export const selectUserData = (state: RootState) => state.user;

export const userReducer = userSlice.reducer;
