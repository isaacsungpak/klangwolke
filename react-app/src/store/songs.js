import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { entities: { songs: {}, comments:{}, newSongs: [], likedSongs: [], likes: {}, queueSong: {} } }

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

export const getUserSongs = createAsyncThunk(
    "songs/getUserSongs",
    async (_args, thunkAPI) => {
        const response = await fetch(`/api/songs/user`);
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

// get all liked songs
export const getLikedSongs = createAsyncThunk(
    "songs/getLikedSongs",
    async (_args, thunkAPI) => {
        const response = await fetch(`/api/songs/like`);
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

// like song
export const likeASong = createAsyncThunk(
    "songs/likeASong",
    async (songId, thunkAPI) => {
        const response = await fetch(`/api/songs/like/${songId}`, { method: "POST" });
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

// unlike song
export const unlikeASong = createAsyncThunk(
    "songs/unlikeASong",
    async (songId, thunkAPI) => {
        const response = await fetch(`/api/songs/like/${songId}`, { method: "DELETE" });
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

////////////////////////////// QUEUE SONG //////////////////////////////
export const getQueueSong = createAsyncThunk(
    "songs/getQueueSong",
    async (id, thunkAPI) => {
        const response = await fetch(`/api/songs/${id}`);
        const data = await response.json();
        if (response.ok && !data.errors) {
            return data;
        }
        throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
    }
);

export const getEasterEgg = createAsyncThunk(
    "songs/getEasterEgg",
    async (_args, thunkAPI) => {
        const response = await fetch(`/api/songs/egg`)
        const data = await response.json();
        if (response.ok && !data.errors) {
            return data;
        }
        throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
    }
);

////////////////////////////// COMMENTS  //////////////////////////////
export const getComments = createAsyncThunk(
    "songs/getComments",
    async (songId, thunkAPI) => {
        const response = await fetch(`/api/comments/${songId}`);
        const data = await response.json();
        if (response.ok && !data.errors) {
            return data;
        }
        throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
    }
);

export const createComment = createAsyncThunk(
    "songs/createComment",
    async ({songId, content}, thunkAPI) => {
        const response = await fetch(`/api/comments/songs/${songId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({content}),
        });
        const data = await response.json();
        if (response.ok && !data.errors) {
            return data;
        }
        throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
    }
);

export const editComment = createAsyncThunk(
    "songs/editComments",
    async ({commentId, content}, thunkAPI) => {
        const response = await fetch(`/api/comments/${commentId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({content}),
        });
        const data = await response.json();
        if (response.ok && !data.errors) {
            return data;
        }
        throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
    }
);

export const deleteComment = createAsyncThunk(
    "songs/deleteComment",
    async (commentId, thunkAPI) => {
        const response = await fetch(`/api/comments/${commentId}`, {
            method: "DELETE"
        });
        const data = await response.json();
        if (response.ok && !data.errors) {
            return data;
        }
        throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
    }
);

const songSlice = createSlice({
    name: "songs",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createSong.fulfilled, (state, action) => {
            state.entities.songs[action.payload.id] = action.payload;
            ///////////////////////////////////////////////////////////
            const newSongs = state.entities.newSongs.slice();
            newSongs.unshift(action.payload.id);
            state.entities.newSongs = newSongs;
            ///////////////////////////////////////////////////////////
        });
        builder.addCase(getSongs.fulfilled, (state, action) => {
            const songs = {}
            action.payload.songs.forEach((song) => {
                songs[song.id] = song
            });
            state.entities.songs = songs;

            const likes = {};
            action.payload.likes.forEach(id => {
                likes[id] = 1
            });
            state.entities.likes = likes;
        });
        builder.addCase(getUserSongs.fulfilled, (state, action) => {
            const songs = {}
            action.payload.songs.forEach((song) => {
                songs[song.id] = song
            });
            state.entities.songs = songs;

            const likes = {};
            action.payload.likes.forEach(id => {
                likes[id] = 1
            });
            state.entities.likes = likes;
        });
        builder.addCase(getLikedSongs.fulfilled, (state, action) => {
            const songs = {}
            action.payload.songs.forEach((song) => {
                songs[song.id] = song
            });
            state.entities.songs = songs;
            state.entities.likedSongs = action.payload.likes;

            const likes = {};
            action.payload.likes.forEach(id => {
                likes[id] = 1
            });
            state.entities.likes = likes;
        });
        builder.addCase(likeASong.fulfilled, (state, action) => {
            const songId = action.payload.songId;
            state.entities.likes[songId] = 1;
        });
        builder.addCase(unlikeASong.fulfilled, (state, action) => {
            const songId = action.payload.songId;
            delete state.entities.likes[songId];
        });
        builder.addCase(getASong.fulfilled, (state, action) => {
            state.entities.songs[action.payload.songs.id] = action.payload.songs;

            const likes = {};
            action.payload.likes.forEach(id => {
                likes[id] = 1
            });
            state.entities.likes = likes;
        });
        builder.addCase(getPlaylistSongs.fulfilled, (state, action) => {
            const songs = {}
            action.payload.songs.forEach((song) => {
                songs[song.id] = song
            });
            state.entities.songs = songs;

            const likes = {};
            action.payload.likes.forEach(id => {
                likes[id] = 1
            });
            state.entities.likes = likes;
        });
        builder.addCase(getUserHome.fulfilled, (state, action) => {
            const songs = {}
            action.payload.songs.forEach((song) => {
                songs[song.id] = song
            })

            state.entities.songs = songs;
            state.entities.newSongs = action.payload.newSongs;
            state.entities.likedSongs = action.payload.likedSongs;

            const likes = {};
            action.payload.likes.forEach(id => {
                likes[id] = 1
            });
            action.payload.likedSongs.forEach(id => {
                likes[id] = 1
            });
            state.entities.likes = likes;
        });
        builder.addCase(getGuestHome.fulfilled, (state, action) => {
            const songs = {}
            action.payload.songs.forEach((song) => {
                songs[song.id] = song
            })
            state.entities.songs = songs;
            state.entities.newSongs = action.payload.newSongs;
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
        builder.addCase(getQueueSong.fulfilled, (state, action) => {
            state.entities.queueSong = action.payload.songs;
        });
        builder.addCase(getEasterEgg.fulfilled, (state, action) => {
            state.entities.queueSong = action.payload.songs;
        });
        builder.addCase(getComments.fulfilled, (state, action) => {
            const comments = {};
            action.payload.comments.forEach(comment => {
                comments[comment.id] = comment;
            })
            state.entities.comments = comments;
        });
        builder.addCase(createComment.fulfilled, (state, action) => {
            state.entities.comments[action.payload.id] = action.payload;
        });
        builder.addCase(editComment.fulfilled, (state, action) => {
            state.entities.comments[action.payload.id] = action.payload;
        });
        builder.addCase(deleteComment.fulfilled, (state, action) => {
            delete state.entities.comments[action.payload.commentId];
        });
    },
});

export default songSlice.reducer;
