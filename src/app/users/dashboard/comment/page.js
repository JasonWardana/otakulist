import Header from '@/components/Dashboard/Header';
import { authUserSession } from '@/libs/auth-libs';
import prisma from '@/libs/prisma';
import Link from 'next/link';

const page = async () => {
  const user = await authUserSession();

  if (!user?.id) {
    return <p>Unauthorized</p>;
  }

  const comments = await prisma.comment.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <section className="mt-4 px-4 w-full">
      <Header title={'My Comment'} />
      <div className="grid grid-cols-1 py-2 gap-4">
        {comments.map((comment) => (
          <Link
            href={`/anime/${comment.animeMalId}`}
            key={comment.id}
            className="bg-white text-black py-4 px-5 rounded"
          >
            <p className="text-sm">{comment.animeTitle}</p>
            <p className="italic">{comment.comment}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default page;
