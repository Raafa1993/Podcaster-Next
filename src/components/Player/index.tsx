import Image from 'next/image';
import { useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { 
  Container,
  CurrentEpisode,
  EmptyPlayer, 
  Header, 
  Footer,
  Progress,
  Sliders,
  EmptySlider,
  Buttons,
} from './styles'

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { 
    episodeList,
    currentEpisodeIndex, 
    isPlaying,
    togglePlay,
    setplayingState,
  } = useContext(PlayerContext)

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  const episode = episodeList[currentEpisodeIndex]

  return (
    <Container>
      <Header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </Header>

      {episode ? (
        <CurrentEpisode>
          <Image 
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit='cover'
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </CurrentEpisode>
      ) : (
        <EmptyPlayer>
          <strong>Selecione um podcast para ouvir</strong>
        </EmptyPlayer>
      )}


      <Footer>
        <Progress>
          <span>00:00</span>
          <Sliders>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361' }}
              />
            ) : (
              <EmptySlider />
            )}
          </Sliders>
          <span>00:00</span>
        </Progress>

        { episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            autoPlay
            onPlay={() => setplayingState(true)}
            onPause={() => setplayingState(false)}
          />
        )}

        <Buttons>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button 
            type="button" 
            className="playButton" 
            disabled={!episode}
            onClick={togglePlay}
          >
            { isPlaying 
              ? <img src="/pause.svg" alt="Tocar" />
              : <img src="/play.svg" alt="Tocar" />
            }
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="Tocar Proxima" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </Buttons>
      </Footer>
    </Container>
  )
}
