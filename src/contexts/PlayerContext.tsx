import { createContext, useState, ReactNode, useContext } from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  play: (episode: Episode) => void; // void indica que não há retorno
  playList: (list: Episode[], index: number) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void
  playNext: () => void;
  playPrevious: () => void;
  clearPlayerState: () => void;
  setPlayingState: (state: boolean) => void;
  hasPrevious: boolean,
  hasNext: boolean;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode; // qualquer coisa que o react aceitaria como um conteúdo do JSX
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  // como a mudança dessas variáveis vai refletir em alguma coisa na pág, crio um estado
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
      setEpisodeList(list);
      setCurrentEpisodeIndex(index);
      setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
      setIsLooping(!isLooping);
  }

  function toggleShuffle() {
      setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
      setEpisodeList([])
      setCurrentEpisodeIndex(0)
  }

  const hasPrevious = currentEpisodeIndex > 0 
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

  function playNext() {

      if (isShuffling) {
        const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)

        setCurrentEpisodeIndex(nextRandomEpisodeIndex)
      } else if (hasNext) {
        setCurrentEpisodeIndex(currentEpisodeIndex + 1)
      }
  }

  function playPrevious() {
      if (hasPrevious) {
        setCurrentEpisodeIndex(currentEpisodeIndex - 1)
      }
  }

  return (
    <PlayerContext.Provider
    value={{
      episodeList,
      currentEpisodeIndex,
      play,
      playList,
      playNext,
      playPrevious,
      isPlaying,
      isLooping,
      isShuffling,
      togglePlay,
      toggleLoop,
      toggleShuffle,
      setPlayingState,
      hasPrevious,
      hasNext,
      clearPlayerState
    }}
  >
      {children}
  </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}
