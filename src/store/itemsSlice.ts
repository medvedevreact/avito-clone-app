import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Item } from "../types/listings";

interface ItemsState {
  items: Item[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await axios.get("http://localhost:3000/items");
  return response.data;
});

export const addItem = createAsyncThunk(
  "items/addItem",
  async (newItem: Item) => {
    const response = await axios.post("http://localhost:3000/items", newItem);
    return response.data;
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Неизвестная ошибка";
      })
      .addCase(addItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Неизвестная ошибка";
      });
  },
});

export default itemsSlice.reducer;
