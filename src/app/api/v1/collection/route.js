import prisma from '@/libs/prisma';
import { authUserSession } from '@/libs/auth-libs';

export async function POST(req) {
  try {
    const user = await authUserSession();
    if (!user) {
      return Response.json({ status: 401 });
    }

    const { anime_mal_id, anime_image, anime_title } = await req.json();

    await prisma.collection.create({
      data: {
        animeMalId: anime_mal_id,
        animeImage: anime_image,
        animeTitle: anime_title,
        user: {
          connect: { email: user.email },
        },
      },
    });

    return Response.json({ status: 200, isCreated: true });
  } catch (error) {
    console.error(error);
    return Response.json({ status: 500 });
  }
}
