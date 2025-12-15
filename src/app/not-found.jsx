'use client';

import { FileSearchIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen max-w-xl mx-auto flex justify-center items-center">
      <div className="flex justify-center items-center gap-4 flex-col">
        <FileSearchIcon
          size={44}
          className="text-amber-500"
        />
        <h3 className="text-amber-500 text-4xl font-bold">NOT FOUND</h3>
        <button
          onClick={() => router.back()}
          className="text-amber-50 hover:text-amber-500 transition-all underline"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default Page;
