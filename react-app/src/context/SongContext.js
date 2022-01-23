import { createContext, useContext, useState } from 'react';

export const SongContext = createContext();

export const useSong = () => useContext(SongContext);

export default function SongProvider({children}) {
  const [currentSong, setCurrentSong] = useState({});

  return (
    <SongContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </SongContext.Provider>
  );
}
