import format from "date-fns/format";
import { ptBR } from "date-fns/locale";
import parseISO from "date-fns/parseISO";
import Image from "next/image";
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from "next";
import { api } from "../../services/api";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

import { Container, ThumbnailContainer, Description } from "./slug";

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  members: string;
  publishedAt: string;
  duration: number;
  durationAsString: string;
  url: string;
};

type EpisodeProps = {
  episode: Episode;
};

export default function Episode({ episode }: EpisodeProps) {
  return (
    <Container>
      <ThumbnailContainer>
        <Link href="/">
          <button className="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>

        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <button className="button">
          <img src="/play.svg" alt="episodio" />
        </button>
      </ThumbnailContainer>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <Description dangerouslySetInnerHTML={{ __html: episode.description }} />
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const { data } = await api.get('episodes', {
  //   params: {
  //     _limit: 12,
  //     _sort: 'published_at',
  //     _order: 'desc' 
  //   }
  // })

  // Caso queira passar alguams rotas staticas 


  return {
    paths: [], // São as rotas que geradas staticamente, pode passar manualmente
    fallback: "blocking",
  };
  // Toda rota que tiver o [] precisa de metodo
};

export const getStaticProps: GetStaticProps = async (contexto) => {
  const { slug } = contexto.params;

  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), "d MMM yy", {
      locale: ptBR,
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  };

  return {
    props: { episode },
    revalidate: 60 * 60 * 24, // 24 Horas
  };
};
