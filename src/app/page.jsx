import AnimeList from '@/components/Animelist';
import Header from '@/components/Animelist/Header';
import {
  getAnimeResponse,
  getNestedAnimeResponse,
  reproduce,
} from '@/libs/api-libs';

const Page = async () => {
  const topAnime = await getAnimeResponse('top/anime', 'limit=8');
  let recommendedAnime = await getNestedAnimeResponse(
    'recommendations/anime',
    'entry'
  );
  recommendedAnime = reproduce(recommendedAnime, 4);

  return (
    <>
      <section className="mx-auto px-4 py-8">
        <Header
          title="Paling Populer"
          linkTitle="Lihat Semua"
          linkHref="/populer"
        />
        <AnimeList api={topAnime} />
      </section>
      <section className="mx-auto px-4 py-8">
        <Header title="Rekomendasi" />
        <AnimeList api={recommendedAnime} />
      </section>
    </>
  );
};

export default Page;
