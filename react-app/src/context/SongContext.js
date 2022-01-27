import { createContext, useContext, useState, useRef } from 'react';

export const SongContext = createContext();

export const useSong = () => useContext(SongContext);

export default function SongProvider({children}) {
    const [currentSong, setCurrentSong] = useState({});
    const [isPlaying, setIsPlaying] = useState(false); 
    const player = useRef();

    return (
        <SongContext.Provider value={{ currentSong, setCurrentSong, isPlaying, setIsPlaying, player }}>
            {children}
        </SongContext.Provider>
    );
}
