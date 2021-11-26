
import { 
  Container,
  Header, 
  EmptyPlayer, 
  Footer,
  Progress,
  Slider,
  EmptySlider,
  Buttons,
} from './styles'

export default function Player() {

  return (
    <Container>
      <Header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </Header>

      <EmptyPlayer>
        <strong>Selecione um podcast para ouvir</strong>
      </EmptyPlayer>

      <Footer>
        <Progress>
          <span>00:00</span>
          <Slider>
            <EmptySlider />
          </Slider>
          <span>00:00</span>
        </Progress>

        <Buttons>
          <button type="button">
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button" className="playButton">
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button type="button">
            <img src="/play.svg" alt="Tocar" />
          </button>
          <button type="button">
            <img src="/play-next.svg" alt="Tocar Proxima" />
          </button>
          <button type="button">
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </Buttons>
      </Footer>
    </Container>
  )
}
