import { GlobalStyles } from "../styles/global"
import Header from "../components/Header"
import Player from "../components/Player"

import { Container, Main } from './styles'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Container>
        <Main>
          <Header />
          <Component {...pageProps} />
        </Main>
        <Player />
      </Container>
      <GlobalStyles />
    </> 
  )
}

export default MyApp
