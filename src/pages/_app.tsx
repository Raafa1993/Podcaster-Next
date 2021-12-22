import { useState } from "react"
import Header from "../components/Header"
import Player from "../components/Player"
import { PlayerContext } from "../contexts/PlayerContext"
import { GlobalStyles } from "../styles/global"

import { Container, Main } from '../styles/styles'

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  function play(episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function setplayingState(state: boolean) {
    setIsPlaying(state);
  }
  return (
    <>
      <PlayerContext.Provider value={{ 
        episodeList, 
        currentEpisodeIndex, 
        play, 
        isPlaying, 
        togglePlay, 
        setplayingState, 
      }}>
          <Container>
            <Main>
              <Header />
              <Component {...pageProps} />
            </Main>
            <Player />
          </Container>
      </PlayerContext.Provider>
      <GlobalStyles />
    </> 
  )
}

export default MyApp
