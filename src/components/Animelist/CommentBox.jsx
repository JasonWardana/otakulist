import prisma from '@/libs/prisma';
import React from 'react';

const CommentBox = async ({ anime_mal_id }) => {
  const comments = await prisma.comment.findMany({
    where: {
      animeMalId: anime_mal_id,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="text-black bg-white p-4 rounded"
        >
          <p className="font-semibold">{comment.user?.name ?? 'Anonymous'}</p>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentBox;
