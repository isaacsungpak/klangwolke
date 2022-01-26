import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { playlists: {} }

// create playlist with first song
export const createPlaylist = createAsyncThunk(
    "playlists/createPlaylist",
    async ({ title, songId }, thunkAPI) => {
        const response = await fetch("/api/playlists/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, songId })
        });
        const data = await response.json();
        if (response.ok && !data.errors) {
            return data;
        } else if (response.status < 500) {
            throw thunkAPI.rejectWithValue(data.errors);
        } else {
            throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
        }
    }
);

// get all playlists / allow search
export const getPlaylists = createAsyncThunk(
    "playlists/getPlaylists",
    async (searchKey, thunkAPI) => {
        const url = `/api/playlists?search=${searchKey}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok && !data.errors) {
            return data;
        } else if (response.status < 500) {
            throw thunkAPI.rejectWithValue(data.errors);
        } else {
            throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
        }
    }
)

// retrieve all playlists that do not already include a specified song
export const getPlaylistsWithoutSong = createAsyncThunk(
    "playlists/getPlaylistsWithoutSong",
    async (songId, thunkAPI) => {
        const url = `/api/playlists/songs/${songId}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok && !data.errors) {
            return data;
        } else if (response.status < 500) {
            throw thunkAPI.rejectWithValue(data.errors);
        } else {
            throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
        }
    }
)

export const addSongToPlaylist = createAsyncThunk(
    "playlists/addSongToPlaylist",
    async ({playlistId, songId}) => {
        const url = `/api/playlists/link/${playlistId}/${songId}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Length": "0"
            }
        });
        const data = await response.json();
        if (response.ok && !data.errors) {
            return data;
        } else if (response.status < 500) {
            throw thunkAPI.rejectWithValue(data.errors);
        } else {
            throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
        }
    }
)

export const editPlaylist = createAsyncThunk(
    "playlists/addSongToPlaylist",
    async ({ playlistId, title }) => {
        const url = `/api/playlists/${playlistId}`;
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title })
        });
        const data = await response.json();
        if (response.ok && !data.errors) {
            return data;
        } else if (response.status < 500) {
            throw thunkAPI.rejectWithValue(data.errors);
        } else {
            throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
        }
    }
)

export const deletePlaylist = createAsyncThunk(
    "playlists/deletePlaylist",
    async (playlistId, thunkAPI) => {
        const response = await fetch(`/api/playlists/${playlistId}`, {
            method: "DELETE"
        });
        const data = await response.json();
        if (response.ok && !data.errors) {
            return data;
        } else if (response.status < 500) {
            throw thunkAPI.rejectWithValue(data.errors);
        } else {
            throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
        }
    }
);
