import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Dashboard/Header';
import { authUserSession } from '@/libs/auth-libs';
import prisma from '@/libs/prisma';

const page = async () => {
  const user = await authUserSession();

  if (!user?.id) {
    return <p>Unauthorized</p>;
  }

  const collection = await prisma.collection.findMany({
    where: { userId: user.id },
  });

  return (
    <section className="mt-4 px-4 w-full">
      <Header title={'My Collection'} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {collection.map((collect) => (
          <Link
            key={collect.id}
            href={`/anime/${collect.animeMalId}`}
            className="relative"
          >
            <Image
              src={collect.animeImage}
              alt={collect.animeTitle || 'Anime Image'}
              width={350}
              height={350}
              className="w-full"
            />
            <div className="absolute flex items-center justify-center bottom-0 w-full bg-amber-500 h-16">
              <h5 className="text-xl text-center">{collect.animeTitle}</h5>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default page;
