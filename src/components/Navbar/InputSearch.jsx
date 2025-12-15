'use client';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const InputSearch = () => {
  const searchRef = useRef();
  const router = useRouter();

  const handleSearch = (event) => {
    const keyword = searchRef.current.value;

    if (!keyword || keyword.trim() == '') return;

    if (event.key === 'Enter' || event.type === 'click') {
      event.preventDefault();
      router.push(`/search/${keyword}`);
    }
  };

  return (
    <div className="relative w-full md:w-auto">
      <input
        placeholder="Cari Anime..."
        className="w-full p-3 rounded bg-white"
        ref={searchRef}
        onKeyDown={handleSearch}
      />
      <button
        className="absolute top-3 end-3"
        onClick={handleSearch}
      >
        <MagnifyingGlassIcon size={24} />
      </button>
    </div>
  );
};

export default InputSearch;
