import Image from 'next/image';
import Link from 'next/link';

const AnimeList = ({ api }) => {
  const uniqueAnime = api.data
    ? Array.from(new Map(api.data.map((a) => [a.mal_id, a])).values())
    : [];

  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">
      {uniqueAnime.map((anime) => {
        return (
          <Link
            key={anime.mal_id}
            href={`/anime/${anime.mal_id}`}
            className="cursor-pointer text-white hover:text-amber-500 transition-all"
          >
            <Image
              src={anime.images.webp.image_url}
              alt={anime.title}
              width={350}
              height={350}
              className="w-full max-h-64 object-cover rounded-xl"
            />
            <h3 className="font-bold md:text-xl text-md p-4">{anime.title}</h3>
          </Link>
        );
      })}
    </div>
  );
};

export default AnimeList;
