'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CommentInput = ({ anime_mal_id, anime_title }) => {
  const [comment, setComment] = useState('');
  const [isCreated, setIsCreated] = useState(false);
  const router = useRouter();

  const handlePosting = async (event) => {
    event.preventDefault();

    try {
      const data = {
        anime_mal_id,
        comment,
        anime_title,
      };

      const response = await fetch('/api/v1/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.isCreated) {
        setIsCreated(true);
        setComment('');
        router.refresh();
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full mt-6">
      {isCreated && <p className="text-white">Postingan Terkirim...</p>}

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tulis komentar kamu di sini..."
        className="w-full min-h-[140px] p-4 rounded-md bg-white text-black"
      />

      <button
        onClick={handlePosting}
        className="w-48 py-2 bg-amber-500 text-black font-semibold rounded-md"
      >
        Posting Komentar
      </button>
    </div>
  );
};

export default CommentInput;
