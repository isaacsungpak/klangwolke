import { createContext, useContext, useState } from 'react';

export const SongContext = createContext();

export const useSong = () => useContext(SongContext);

export default function SongProvider({children}) {
    const [currentSong, setCurrentSong] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <SongContext.Provider value={{ currentSong, setCurrentSong, isPlaying, setIsPlaying }}>
        {children}
        </SongContext.Provider>
    );
}
