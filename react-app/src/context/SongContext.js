import { createContext, useContext, useState, useRef } from 'react';

export const SongContext = createContext();

export const useSong = () => useContext(SongContext);

export default function SongProvider({children}) {
    const [queue, setQueue] = useState([]);
    const [currentSong, setCurrentSong] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const player = useRef();

    return (
        <SongContext.Provider value={{ queue, setQueue, currentSong, setCurrentSong, isPlaying, setIsPlaying, player }}>
            {children}
        </SongContext.Provider>
    );
}
