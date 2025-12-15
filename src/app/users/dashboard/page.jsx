import { authUserSession } from '@/libs/auth-libs';
import Image from 'next/image';
import Link from 'next/link';

const page = async () => {
  const user = await authUserSession();

  if (!user) {
    return <p className="text-white">Unauthorized</p>;
  }

  return (
    <div className="mt-5 text-white flex flex-col justify-center items-center">
      <h5 className="text-2xl font-bold">Welcome, {user.name}</h5>

      {user.image && (
        <Image
          src={user.image}
          alt={user.name || 'User Avatar'}
          width={250}
          height={250}
        />
      )}

      <div className="flex flex-wrap gap-4 py-5">
        <Link
          href="/users/dashboard/collection"
          className="bg-amber-500 text-black font-bold py-2 px-4 text-xl rounded"
        >
          My Collection
        </Link>
        <Link
          href="/users/dashboard/comment"
          className="bg-amber-500 text-black font-bold py-2 px-4 text-xl rounded"
        >
          My Comment
        </Link>
      </div>
    </div>
  );
};

export default page;
