import { getAnimeResponse } from '@/libs/api-libs';
import AnimeList from '@/components/Animelist';
import Header from '@/components/Animelist/Header';

const Page = async ({ params }) => {
  const resolvedParams = await params;

  const decodedKeyword = decodeURIComponent(resolvedParams.keyword);
  const searchAnime = await getAnimeResponse('anime', `q=${decodedKeyword}`);

  return (
    <section className="mx-auto px-4 py-4">
      <Header title={`Pencarian Untuk ${decodedKeyword}...`} />
      <AnimeList api={searchAnime} />
    </section>
  );
};

export default Page;
