'use client';
import React, { useState } from 'react';

const CollectionButton = ({ anime_mal_id, anime_image, anime_title }) => {
  const [isCreated, setIsCreated] = useState(false);

  const handleCollection = async (event) => {
    event.preventDefault();

    try {
      const data = { anime_mal_id, anime_image, anime_title };

      const response = await fetch('/api/v1/collection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.isCreated) setIsCreated(true);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <>
      {isCreated ? (
        <p className="text-white">Berhasil Ditambahkan Ke Koleksi</p>
      ) : (
        <button
          onClick={handleCollection}
          className="px-2 py-1 bg-amber-500 rounded relative z-10 cursor-pointer"
        >
          Add To Collection
        </button>
      )}
    </>
  );
};

export default CollectionButton;
