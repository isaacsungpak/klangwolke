Table users {
  id int [pk, increment]
  username varchar
  email varchar
  bio text
  hashed_password bytea
  created_at datetime
  updated_at datetime
}

Table songs {
  id int [pk, increment]
  title varchar
  audio_url varchar
  artwork_url varchar
  user_id int [ref: > users.id]
  created_at datetime
  updated_at datetime
}

Table playlists {
  id int [pk, increment]
  title varchar
  user_id int [ref: > users.id]
  created_at datetime
  updated_at datetime
}

Table songs_to_playlists {
  song_id int [pk, ref: > songs.id]
  playlist_id int [pk, ref: > playlists.id]
  created_at datetime
  updated_at datetime
}

Table likes {
  user_id int [pk, ref: > users.id]
  song_id int [pk, ref: > songs.id]
  created_at datetime
  updated_at datetime
}

Table comments {
  user_id int [pk, ref: > users.id]
  song_id int [pk, ref: > songs.id]
  content text
  created_at datetime
  updated_at datetime
}
