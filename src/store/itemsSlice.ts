import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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

export const fetchItems = createAsyncThunk<Item[]>(
  "items/fetchItems",
  async () => {
    try {
      const response = await axios.get<Item[]>("http://localhost:3000/items");
      return response.data;
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      throw error;
    }
  }
);

export const addItem = createAsyncThunk<Item, Omit<Item, "id">>(
  "items/addItem",
  async (newItem: Omit<Item, "id">) => {
    try {
      const response = await axios.post<Item>(
        "http://localhost:3000/items",
        newItem
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка при добавлении элемента:", error);
      throw error;
    }
  }
);

export const updateItem = createAsyncThunk<
  Item,
  { id: number; updatedItem: Omit<Item, "id"> }
>("items/updateItem", async ({ id, updatedItem }) => {
  try {
    const response = await axios.put<Item>(
      `http://localhost:3000/items/${id}`,
      updatedItem
    );
    return response.data as Item;
  } catch (error) {
    console.error("Ошибка при обновлении элемента:", error);
    throw error;
  }
});

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Неизвестная ошибка при загрузке данных";
      })

      .addCase(addItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItem.fulfilled, (state, action: PayloadAction<Item>) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addItem.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Неизвестная ошибка при добавлении элемента";
      })

      .addCase(updateItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateItem.fulfilled, (state, action: PayloadAction<Item>) => {
        state.status = "succeeded";
        const updatedItem = action.payload;
        const index = state.items.findIndex(
          (item) => item.id === updatedItem.id
        );
        if (index !== -1) {
          state.items[index] = updatedItem;
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Неизвестная ошибка при обновлении элемента";
      });
  },
});

export default itemsSlice.reducer;
