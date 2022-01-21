# Redux State

```js
{
    session: {
        user: {
            id: 1,
            username: "username",
            email: "email@address.com"
        }
    },
    songs: {
        entities: {
            songs: {
                2: {
                    id: 2,
                    title: "song title",
                    audio: "www.resources.com/song.mp3",
                    image: "www.resources.com/artwork.png",
                    userId: 3,
                    createdAt: "datetime",
                    updatedAt: "datetime",
                    owner: {
                        id: 3,
                        username: "username3"
                    },
                    likeCount: 4
                },
            },
            comments: {
                4: {
                    user_id: 4,
                    song_id: 2,
                    content: "content",
                    createdAt: "datetime",
                    updatedAt: "datetime",
                    user: {
                        id: 4,
                        username: "username4"
                    }
                },
                7: {
                    user_id: 7,
                    song_id: 2,
                    content: "content",
                    createdAt: "datetime",
                    updatedAt: "datetime",
                    user: {
                        id: 7,
                        username: "username7"
                    }
                },
            },
            newSongs: [7, 8, 9],
            likedSongs: [2, 3, 4]
            likes: [2],
            queue: [2, 3, 4]
        },
    },
    playlists: {
        playlists: {
            8: {
                    id: 8,
                    title: "playlist title",
                    user_id: 1,
                    createdAt: "datetime",
                    updatedAt: "datetime",
                    owner: {
                        id: 1,
                        username: "username"
                    },
                    songCount: 3,
                    image: "www.resources.com/more_artwork.png",
                },
        }
    }
}
```
