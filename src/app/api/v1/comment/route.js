import prisma from '@/libs/prisma';
import { authUserSession } from '@/libs/auth-libs';

export async function POST(request) {
  try {
    const user = await authUserSession();

    if (!user) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { anime_mal_id, comment, anime_title } = await request.json();

    if (!comment || !anime_mal_id) {
      return Response.json({ message: 'Data tidak lengkap' }, { status: 400 });
    }

    await prisma.comment.create({
      data: {
        animeMalId: anime_mal_id,
        comment,
        animeTitle: anime_title,
        user: {
          connect: { email: user.email },
        },
      },
    });

    return Response.json({ isCreated: true });
  } catch (error) {
    console.error(error);
    return Response.json({ isCreated: false }, { status: 500 });
  }
}
