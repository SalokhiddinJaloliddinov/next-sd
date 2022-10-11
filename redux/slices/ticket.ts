import { TicketList } from "../../utils/api/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "../store";

export interface TicketState {
  data: TicketList | null;
}

const initialState: TicketState = {
  data: null,
};

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setTicketData: (state, action: PayloadAction<TicketList>) => {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.data = action.payload.ticket.data;
      console.log(state.data);
    },
  },
});

export const { setTicketData } = ticketSlice.actions;
export const selectTicketData = (state: RootState) => state.ticket;

export const ticketReducer = ticketSlice.reducer;
