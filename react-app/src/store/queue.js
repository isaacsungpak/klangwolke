import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { song: null };

export const getQueueSong = createAsyncThunk(
  "queue/getQueueSong",
  async (id, thunkAPI) => {
    const response = await fetch(`/api/songs/${id}`);
    const data = await response.json();
    if (response.ok && !data.errors) {
      return data;
    }
    throw thunkAPI.rejectWithValue(["Something went wrong :("]);
  }
);

const queueSlice = createSlice({
    name: "queue",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getQueueSong.fulfilled, (state, action) => {
        state.song = action.payload.songs;
      });
    },
  });

export default queueSlice.reducer;
