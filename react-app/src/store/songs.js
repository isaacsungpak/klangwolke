import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { entities: { songs: {}, newSongs: [], likedSongs: [], likes: [] } }

export const createSong = createAsyncThunk(
    "songs/createSong",
    async ({ title, audio, image }, thunkAPI) => {
        const songForm = new FormData();
        songForm.append("title", title);
        songForm.append("audio", audio);
        songForm.append("image", image);
        const response = await fetch("/api/songs/", {
            method: "POST",
            body: songForm
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

// search for songs by search key
export const getSongs = createAsyncThunk(
    "songs/getSongs",
    async (searchKey, thunkAPI) => {
        let url = `/api/songs/`
        if (searchKey) url += `?key=${searchKey}`;
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
);

// search for songs by search key
export const getPlaylistSongs = createAsyncThunk(
    "songs/getPlaylistSongs",
    async (playlistId, thunkAPI) => {
        const response = await fetch(`/api/songs/playlist/${playlistId}`);
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

export const getUserHome = createAsyncThunk(
    "songs/getUserHome",
    async (_args, thunkAPI) => {
        const response = await fetch(`/api/songs/user_home`)
        const data = await response.json()
        if (response.ok && !data.errors) {
            return data;
        } else if (response.status < 500) {
            throw thunkAPI.rejectWithValue(data.errors);
        } else {
            throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
        }
    }
)

export const getGuestHome = createAsyncThunk(
    "songs/getGuestHome",
    async (_args, thunkAPI) => {
        const response = await fetch(`/api/songs/guest_home`)
        const data = await response.json()
        if (response.ok && !data.errors) {
            return data;
        } else if (response.status < 500) {
            throw thunkAPI.rejectWithValue(data.errors);
        } else {
            throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
        }
    }
)

export const getASong = createAsyncThunk(
    "songs/getASong",
    async (songId, thunkAPI) => {
        const response = await fetch(`/api/songs/${songId}`)
        const data = await response.json()
        if (response.ok && !data.errors) {
            return data;
        } else if (response.status < 500) {
            throw thunkAPI.rejectWithValue(data.errors);
        } else {
            throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
        }
    }
)

export const editSong = createAsyncThunk(
    "songs/editSong",
    async ({ songId, title }, thunkAPI) => {
        const response = await fetch(`/api/songs/${songId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title}),
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

export const deleteSong = createAsyncThunk(
    "songs/deleteSong",
    async (songId, thunkAPI) => {
        const response = await fetch(`/api/songs/${songId}`, {
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

export const removeSongFromPlaylist = createAsyncThunk(
    "songs/removeSongFromPlaylist",
    async ({songId, playlistId}, thunkAPI) => {
        const response = await fetch(`/api/songs/${songId}/playlists/${playlistId}`, {
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
)

const songSlice = createSlice({
    name: "songs",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createSong.fulfilled, (state, action) => {
            state.entities.songs[action.payload.id] = action.payload;
        });
        builder.addCase(getSongs.fulfilled, (state, action) => {
            const songs = {}
            action.payload.songs.forEach((song) => {
                songs[song.id] = song
            })
            state.entities.songs = songs;
            state.entities.likes = action.payload.likes;
        });
        builder.addCase(getPlaylistSongs.fulfilled, (state, action) => {
            const songs = {}
            action.payload.songs.forEach((song) => {
                songs[song.id] = song
            })
            state.entities.songs = songs;
            state.entities.likes = action.payload.likes;
        });
        builder.addCase(getUserHome.fulfilled, (state, action) => {
            const songs = {}
            action.payload.songs.forEach((song) => {
                songs[song.id] = song
            })
            state.entities.songs = songs;
            state.entities.newSongs = action.payload.newSongs;
            state.entities.likedSongs = action.payload.likedSongs;
            state.entities.likes = action.payload.likes;
        });
        builder.addCase(getGuestHome.fulfilled, (state, action) => {
            const songs = {}
            action.payload.songs.forEach((song) => {
                songs[song.id] = song
            })
            state.entities.songs = songs;
            state.entities.newSongs = action.payload.newSongs;
        });
        builder.addCase(getASong.fulfilled, (state, action) => {
            state.entities.songs[action.payload.songs.id] = action.payload.songs;
            state.entities.likes = action.payload.likes;
        });
        builder.addCase(editSong.fulfilled, (state, action) => {
            state.entities.songs[action.payload.id] = action.payload;
        });
        builder.addCase(deleteSong.fulfilled, (state, action) => {
            delete state.entities.songs[action.payload.songId];
        });
        builder.addCase(removeSongFromPlaylist.fulfilled, (state, action) => {
            delete state.entities.songs[action.payload.songId];
        });
    },
});

export default songSlice.reducer;
