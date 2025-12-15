import CollectionButton from '@/components/Animelist/CollectionButton';
import { getAnimeResponse } from '@/libs/api-libs';
import { authUserSession } from '@/libs/auth-libs';
import prisma from '@/libs/prisma';
import Image from 'next/image';
import CommentInput from '../../../components/Animelist/CommentInput';
import CommentBox from '@/components/Animelist/CommentBox';

const Page = async ({ params }) => {
  const { id } = await params;
  const anime = await getAnimeResponse(`anime/${id}`);
  const user = await authUserSession();

  const collection = await prisma.collection.findFirst({
    where: {
      animeMalId: id,
      user: {
        email: user?.email,
      },
    },
  });

  const synopsis = anime?.data?.synopsis || null;

  return (
    <>
      <div className="pt-4 px-4">
        <h3 className="text-2xl text-white">
          {anime.data.title} - {anime.data.year}
        </h3>
        {!collection && user && (
          <CollectionButton
            anime_mal_id={id}
            user_email={user?.email}
            anime_image={anime.data.images.webp.image_url}
            anime_title={anime.data.title}
          />
        )}
      </div>

      <div className="pt-4 px-4 flex gap-2 text-white overflow-auto">
        <div className="w-36 flex flex-col justify-center items-center rounded border border-color-white p-2">
          <h3>PERINGKAT</h3>
          <p>{anime.data.rank}</p>
        </div>

        <div className="w-36 flex flex-col justify-center items-center rounded border border-color-white p-2">
          <h3>SKOR</h3>
          <p>{anime.data.score}</p>
        </div>

        <div className="w-36 flex flex-col justify-center items-center rounded border border-color-white p-2">
          <h3>EPISODE</h3>
          <p>{anime.data.episodes}</p>
        </div>

        <div className="w-36 flex flex-col justify-center items-center rounded border border-color-white p-2">
          <h3>FAVORIT</h3>
          <p>{anime.data.favorites}</p>
        </div>
      </div>

      <div className="pt-4 px-4 flex sm:flex-nowrap flex-wrap gap-4 text-white">
        <div className="shrink-0">
          <Image
            src={anime.data.images.webp.image_url}
            alt={anime.data.title}
            width={250}
            height={350}
            className="rounded object-cover"
          />
        </div>

        <div className="flex-1 min-w-[250px]">
          {synopsis ? (
            <p className="text-justify text-xl">{synopsis}</p>
          ) : (
            <p className="text-xl italic text-gray-400">
              Tidak ada sinopsis yang tersedia.
            </p>
          )}
        </div>
      </div>
      <div className="px-4 py-2">
        <h3 className="text-white text-xl mb-2">Komentar Penonton</h3>
        <CommentBox anime_mal_id={id} />
        {user && (
          <CommentInput
            anime_mal_id={id}
            user_email={user?.email}
            username={user?.name}
            anime_title={anime.data.title}
          />
        )}
      </div>
    </>
  );
};

export default Page;
